import { Section } from "../components/Section";
import { newsletterBenefits, newsletterTopics } from "../data/newsletter";

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Newsletter</p>
        <h1 className="text-4xl font-bold text-slate-900">Subscribe to the FlowSystems Brief</h1>
        <p className="text-base text-slate-600">
          Weekly notes on operating systems, practitioner teardowns, and the metrics we are watching. Sign up to receive the mock
          brief and be first in line for the live launch.
        </p>
      </header>

      <Section eyebrow="Sign up" title="Request the brief">
        <form className="space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <label className="block text-sm font-medium text-slate-700" htmlFor="email">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@company.com"
          />
          <label className="block text-sm font-medium text-slate-700" htmlFor="role">
            Role
          </label>
          <input
            id="role"
            name="role"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., Director of Operations"
          />
          <button
            type="button"
            className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Join the waitlist
          </button>
          <p className="text-xs text-slate-500">
            This form is mocked for MVP testing—submissions will log to the console once the API is wired up.
          </p>
        </form>
      </Section>

      <Section eyebrow="Why subscribe" title="What you will learn" contentClassName="space-y-4">
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          {newsletterBenefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Regular segments</h2>
          <ul className="mt-2 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
            {newsletterTopics.map((topic) => (
              <li key={topic} className="rounded-full bg-slate-100 px-3 py-1">
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}
