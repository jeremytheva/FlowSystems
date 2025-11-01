interface PlatformPageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PlatformPageProps) {
  return (
    <div>
      <h2>Platform Detail</h2>
      <p className="text-sm text-slate-600">Platform slug: {params.slug}</p>
    </div>
  );
}
