interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: CategoryPageProps) {
  return (
    <div>
      <h2>Category</h2>
      <p className="text-sm text-slate-600">Selected category: {params.slug}</p>
    </div>
  );
}
