interface StackPageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: StackPageProps) {
  return (
    <div>
      <h2>Stack of the Week</h2>
      <p className="text-sm text-slate-600">Stack identifier: {params.slug}</p>
    </div>
  );
}
