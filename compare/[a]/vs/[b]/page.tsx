interface ComparePageProps {
  params: {
    a: string;
    b: string;
  };
}

export default function Page({ params }: ComparePageProps) {
  const first = params.a;
  const second = params.b;
  return (
    <div>
      <h2>Comparison</h2>
      <p className="text-sm text-slate-600">
        Evaluating {first} versus {second}
      </p>
    </div>
  );
}
