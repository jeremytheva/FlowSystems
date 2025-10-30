import type { ReactNode } from "react";

type FactorDelta = {
  title: string;
  description?: ReactNode;
  outcome?: string;
};

type ChooseIfProps = {
  a: string;
  b: string;
  deltas?: FactorDelta[];
};

export function ChooseIf({ a, b, deltas = [] }: ChooseIfProps) {
  return (
    <section>
      <h3>Choose {a} if…</h3>
      <p>
        Highlight the situations where <strong>{a}</strong> is the better fit.
      </p>
      <h3>Choose {b} if…</h3>
      <p>
        Explain when <strong>{b}</strong> should be preferred instead.
      </p>
      {deltas.length > 0 ? (
        <div>
          <h4>Key factor changes</h4>
          <ul>
            {deltas.map((delta, index) => (
              <li key={index}>
                <strong>{delta.title}</strong>
                {delta.outcome ? <span>: {delta.outcome}</span> : null}
                {delta.description ? <div>{delta.description}</div> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
