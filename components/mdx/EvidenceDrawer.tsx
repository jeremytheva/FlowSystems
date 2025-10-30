import type { ReactNode } from "react";

type EvidenceItem = {
  title: string;
  summary?: ReactNode;
  link?: string;
};

type EvidenceDrawerProps = {
  items?: EvidenceItem[];
};

export function EvidenceDrawer({ items = [] }: EvidenceDrawerProps) {
  if (items.length === 0) {
    return <p>Add evidence items to reinforce the review.</p>;
  }

  return (
    <section>
      <h3>Evidence</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong>
            {item.summary ? <div>{item.summary}</div> : null}
            {item.link ? (
              <div>
                <a href={item.link}>Source</a>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
