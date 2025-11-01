interface ComparePageProps {
  params: {
    a: string;
    b: string;
  };
}

export default function Page({ params }: ComparePageProps) {
  return (
    <div>
      <h2>Comparison</h2>
      <p className="text-sm text-slate-600">
        Evaluating {params.a} versus {params.b}
      </p>
    </div>
  );
}
