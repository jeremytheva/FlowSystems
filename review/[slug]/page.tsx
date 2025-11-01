interface ReviewPageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: ReviewPageProps) {
  return (
    <div>
      <h2>Review</h2>
      <p className="text-sm text-slate-600">Viewing report: {params.slug}</p>
    </div>
  );
}
