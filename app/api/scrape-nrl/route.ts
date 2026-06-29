import { NextResponse } from "next/server";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

type ProbeResult = {
  htmlLength: number;
  hasNextData: boolean;
  hasMatchCentre: boolean;
  hasPlayerStats: boolean;
  hasBroncos: boolean;
  hasStorm: boolean;
  scriptCount: number;
  jsonScriptCount: number;
  candidateScriptCount: number;
  discoveredDataUrls: string[];
};

const PAGE_MARKERS = ["__NEXT_DATA__", "matchCentre", "match-center", "playerStats", "players", "homeTeam", "awayTeam"];
const DATA_URL_PATTERN = /https?:\/\/[^"'<>\s]+|\/(?:api|_next\/data|graphql)[^"'<>\s]*/gi;

function jsonResponse(payload: unknown, status = 200) {
  return NextResponse.json(payload, {
    status,
    headers: {
      "cache-control": "no-store",
    },
  });
}

function getTargetUrl(request: Request) {
  const { searchParams } = new URL(request.url);
  return searchParams.get("url") ?? searchParams.get("matchUrl");
}

function isNrlMatchUrl(value: string) {
  try {
    const url = new URL(value);
    return /(^|\.)nrl\.com$/.test(url.hostname) && url.pathname.includes("/draw/");
  } catch {
    return false;
  }
}

async function fetchMatchPage(url: string) {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "accept-language": "en-AU,en;q=0.9,en-US;q=0.8",
      "user-agent":
        "Mozilla/5.0 (compatible; FlowSystemsNRLScraper/1.0; +https://flowsystems.local)",
    },
  });

  const html = await response.text();
  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    finalUrl: response.url,
    html,
  };
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function extractScripts(html: string) {
  return Array.from(html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)).map((match) => ({
    attrs: match[1] ?? "",
    body: decodeHtmlEntities(match[2] ?? ""),
  }));
}

function tryParseJson(value: string): JsonValue | undefined {
  try {
    return JSON.parse(value) as JsonValue;
  } catch {
    return undefined;
  }
}

function extractNextData(html: string) {
  const match = html.match(/<script[^>]+id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i);
  return match ? tryParseJson(decodeHtmlEntities(match[1])) : undefined;
}

function scoreJson(value: unknown): number {
  const text = JSON.stringify(value)?.toLowerCase() ?? "";
  return ["match", "fixture", "player", "stat", "home", "away", "team"].reduce(
    (score, marker) => score + (text.includes(marker) ? 1 : 0),
    0
  );
}

function findObjects(value: unknown, predicate: (candidate: Record<string, unknown>) => boolean, limit = 20) {
  const found: Record<string, unknown>[] = [];
  const visit = (node: unknown) => {
    if (found.length >= limit || node == null) return;
    if (Array.isArray(node)) {
      for (const item of node) visit(item);
      return;
    }
    if (typeof node === "object") {
      const record = node as Record<string, unknown>;
      if (predicate(record)) found.push(record);
      for (const item of Object.values(record)) visit(item);
    }
  };
  visit(value);
  return found;
}

function summarizeRecord(record: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(record)
      .filter(([, value]) => ["string", "number", "boolean"].includes(typeof value) || value == null)
      .slice(0, 20)
  );
}

function buildProbe(html: string): ProbeResult {
  const scripts = extractScripts(html);
  const candidateScripts = scripts.filter(({ body }) =>
    PAGE_MARKERS.some((marker) => body.toLowerCase().includes(marker.toLowerCase()))
  );
  const jsonScripts = scripts.filter(({ attrs, body }) =>
    attrs.includes("application/json") || Boolean(tryParseJson(body.trim()))
  );
  const urls = Array.from(html.matchAll(DATA_URL_PATTERN))
    .map((match) => match[0])
    .filter((url) => /api|graphql|_next\/data|match|fixture|stats|draw/i.test(url));

  return {
    htmlLength: html.length,
    hasNextData: html.includes("__NEXT_DATA__"),
    hasMatchCentre: /matchCentre|match-center/i.test(html),
    hasPlayerStats: /playerStats|player-stats/i.test(html),
    hasBroncos: html.includes("Broncos"),
    hasStorm: html.includes("Storm"),
    scriptCount: scripts.length,
    jsonScriptCount: jsonScripts.length,
    candidateScriptCount: candidateScripts.length,
    discoveredDataUrls: Array.from(new Set(urls)).slice(0, 25),
  };
}

function extractEmbeddedData(html: string) {
  const scripts = extractScripts(html);
  const nextData = extractNextData(html);
  const parsedScripts = scripts
    .map(({ attrs, body }, index) => ({ index, attrs, parsed: tryParseJson(body.trim()) }))
    .filter((script) => script.parsed !== undefined)
    .map((script) => ({ ...script, score: scoreJson(script.parsed) }))
    .sort((a, b) => b.score - a.score);

  const payloads = [nextData, ...parsedScripts.map((script) => script.parsed)].filter(Boolean);
  const teams = payloads.flatMap((payload) =>
    findObjects(
      payload,
      (candidate) =>
        typeof candidate.name === "string" &&
        /team|club|squad|home|away/i.test(Object.keys(candidate).join(" ")),
      12
    )
  );
  const playerStats = payloads.flatMap((payload) =>
    findObjects(
      payload,
      (candidate) =>
        Object.keys(candidate).some((key) => /player|athlete/i.test(key)) &&
        Object.keys(candidate).some((key) => /stat|tackle|run|try|goal|metre|meter/i.test(key)),
      25
    )
  );

  return {
    nextDataFound: Boolean(nextData),
    parsedJsonScriptCount: parsedScripts.length,
    bestJsonScriptScores: parsedScripts.slice(0, 5).map(({ index, attrs, score }) => ({ index, attrs, score })),
    candidateTeams: teams.slice(0, 12).map(summarizeRecord),
    candidatePlayerStats: playerStats.slice(0, 25).map(summarizeRecord),
  };
}

function identityFromUrl(targetUrl: string) {
  const url = new URL(targetUrl);
  const segments = url.pathname.split("/").filter(Boolean);
  return {
    competition: segments[1] ?? null,
    season: segments[2] ?? null,
    round: segments[3] ?? null,
    slug: segments[4] ?? null,
  };
}

export async function GET(request: Request) {
  const targetUrl = getTargetUrl(request);

  if (!targetUrl) {
    return jsonResponse(
      {
        ok: false,
        error: "Missing NRL match URL. Pass ?url=https://www.nrl.com/draw/... or ?matchUrl=...",
      },
      400
    );
  }

  if (!isNrlMatchUrl(targetUrl)) {
    return jsonResponse(
      {
        ok: false,
        error: "The scrape-nrl endpoint only accepts nrl.com draw match URLs.",
      },
      400
    );
  }

  try {
    const fetched = await fetchMatchPage(targetUrl);
    const probe = buildProbe(fetched.html);
    const embedded = extractEmbeddedData(fetched.html);
    const hasValidatedPayload = embedded.nextDataFound || embedded.parsedJsonScriptCount > 0;

    return jsonResponse({
      ok: fetched.ok,
      Detail_Scrape_Status: hasValidatedPayload ? "embedded_payload_found" : "fallback",
      Detail_Scrape_Note: hasValidatedPayload
        ? "Fetched static HTML contained parseable embedded JSON candidates. Inspect candidateTeams/candidatePlayerStats and discoveredDataUrls to wire strict extraction."
        : "NRL page did not expose parseable embedded JSON in static HTML. Use discoveredDataUrls or a browser renderer such as Playwright for JavaScript-rendered data.",
      request: {
        inputUrl: targetUrl,
        finalUrl: fetched.finalUrl,
        httpStatus: fetched.status,
        httpStatusText: fetched.statusText,
      },
      fixtureIdentity: identityFromUrl(targetUrl),
      probe,
      embedded,
      home: embedded.candidateTeams[0] ?? {},
      away: embedded.candidateTeams[1] ?? {},
      PlayerStats: embedded.candidatePlayerStats,
    });
  } catch (error) {
    console.error("Failed to scrape NRL match page", error);
    return jsonResponse(
      {
        ok: false,
        Detail_Scrape_Status: "error",
        Detail_Scrape_Note: error instanceof Error ? error.message : "Unknown scrape failure",
      },
      500
    );
  }
}
