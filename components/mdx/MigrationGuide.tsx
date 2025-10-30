type MigrationStep = {
  title: string;
  detail?: string;
};

type MigrationRisk = {
  risk: string;
  mitigation?: string;
};

type MigrationGuideProps = {
  from: string;
  to: string;
  steps?: MigrationStep[];
  risks?: MigrationRisk[];
};

export function MigrationGuide({
  from,
  to,
  steps = [],
  risks = [],
}: MigrationGuideProps) {
  return (
    <section>
      <h3>
        Migration from {from} to {to}
      </h3>
      {steps.length === 0 ? (
        <p>Add migration steps to walk readers through the transition.</p>
      ) : (
        <ol>
          {steps.map((step, index) => (
            <li key={index}>
              <strong>{step.title}</strong>
              {step.detail ? <div>{step.detail}</div> : null}
            </li>
          ))}
        </ol>
      )}
      {risks.length > 0 ? (
        <div>
          <h4>Risks to watch</h4>
          <ul>
            {risks.map((risk, index) => (
              <li key={index}>
                <strong>{risk.risk}</strong>
                {risk.mitigation ? <div>Mitigate: {risk.mitigation}</div> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
