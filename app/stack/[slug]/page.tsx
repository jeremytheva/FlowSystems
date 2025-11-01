interface StackPageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: StackPageProps) {
  const stackSlug = decodeURIComponent(params.slug);
  return (
    <div>
      <h2>Stack of the Week</h2>
      <p className="text-sm text-slate-600">Stack identifier: {stackSlug}</p>
    </div>
  );
}
