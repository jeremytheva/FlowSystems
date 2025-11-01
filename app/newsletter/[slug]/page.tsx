interface NewsletterPageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: NewsletterPageProps) {
  const issueId = decodeURIComponent(params.slug);
  return (
    <div>
      <h2>Newsletter Issue</h2>
      <p className="text-sm text-slate-600">Issue reference: {issueId}</p>
    </div>
  );
}
