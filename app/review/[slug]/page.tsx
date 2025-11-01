interface ReviewPageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: ReviewPageProps) {
  const { slug } = params;
  return (
    <div>
      <h2>Review</h2>
      <p className="text-sm text-slate-600">Viewing report: {decodeURIComponent(slug)}</p>
    </div>
  );
}
