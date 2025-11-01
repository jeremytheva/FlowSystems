interface ComparePageProps {
  params: {
    a: string;
    b: string;
  };
}

export default function Page({ params }: ComparePageProps) {
  const first = decodeURIComponent(params.a);
  const second = decodeURIComponent(params.b);
  return (
    <div>
      <h2>Comparison</h2>
      <p className="text-sm text-slate-600">
        Evaluating {first} versus {second}
      </p>
    </div>
  );
}
