interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: CategoryPageProps) {
  const categorySlug = decodeURIComponent(params.slug);
  return (
    <div>
      <h2>Category</h2>
      <p className="text-sm text-slate-600">Selected category: {categorySlug}</p>
    </div>
  );
}
