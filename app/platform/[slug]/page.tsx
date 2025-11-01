interface PlatformPageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PlatformPageProps) {
  const platformSlug = decodeURIComponent(params.slug);
  return (
    <div>
      <h2>Platform Detail</h2>
      <p className="text-sm text-slate-600">Platform slug: {platformSlug}</p>
    </div>
  );
}
