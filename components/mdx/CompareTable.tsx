type ComparisonRow = {
  feature: string;
  aValue?: string;
  bValue?: string;
  notes?: string;
};

type CompareTableProps = {
  data?: ComparisonRow[];
};

export function CompareTable({ data = [] }: CompareTableProps) {
  if (data.length === 0) {
    return (
      <p>
        Add a <code>comparisonData</code> array to highlight the most
        important feature differences.
      </p>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>A</th>
          <th>B</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.feature}</td>
            <td>{row.aValue ?? ""}</td>
            <td>{row.bValue ?? ""}</td>
            <td>{row.notes ?? ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
