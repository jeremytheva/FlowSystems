type SnapshotPollProps = {
  question: string;
  options: string[];
};

export function SnapshotPoll({ question, options }: SnapshotPollProps) {
  return (
    <section>
      <h3>{question}</h3>
      <ul>
        {options.map((option) => (
          <li key={option}>
            <label>
              <input type="radio" name="snapshot-poll" disabled /> {option}
            </label>
          </li>
        ))}
      </ul>
      <p>Polling will be interactive once wired to a backend.</p>
    </section>
  );
}
