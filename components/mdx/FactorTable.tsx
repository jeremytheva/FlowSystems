import type { ReactNode } from "react";

type Factor = {
  key: string;
  raw: number;
  direction?: "normal" | "inverted";
  weight?: number;
  commentary?: ReactNode;
};

type FactorTableProps = {
  factors?: Factor[];
};

export function FactorTable({ factors = [] }: FactorTableProps) {
  if (factors.length === 0) {
    return <p>Add factor data to the frontmatter to summarize scoring.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Factor</th>
          <th>Score</th>
          <th>Direction</th>
          <th>Weight</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {factors.map((factor) => (
          <tr key={factor.key}>
            <td>{factor.key}</td>
            <td>{factor.raw}</td>
            <td>{factor.direction ?? "normal"}</td>
            <td>{factor.weight ?? "-"}</td>
            <td>{factor.commentary ?? ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
