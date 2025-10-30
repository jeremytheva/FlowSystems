type SetupDefaults = {
  imports?: number;
  automations?: number;
  users?: number;
};

type SetupEstimatorProps = {
  defaults?: SetupDefaults;
};

export function SetupEstimator({ defaults }: SetupEstimatorProps) {
  const { imports = 0, automations = 0, users = 1 } = defaults ?? {};

  return (
    <section>
      <h3>Setup estimator</h3>
      <p>Adjust these assumptions to forecast the onboarding effort.</p>
      <ul>
        <li>Data imports: {imports}</li>
        <li>Automations to configure: {automations}</li>
        <li>Team members involved: {users}</li>
      </ul>
    </section>
  );
}
