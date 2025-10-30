import Link from 'next/link';
import PresetButtons from '@/components/PresetButtons';
import Wizard from '@/components/Wizard';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Start with a preset</h2>
        <PresetButtons />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Need guidance?</h2>
        <Wizard />
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        <Link
          href="/review"
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300"
        >
          <h3 className="text-xl font-semibold">Latest Review</h3>
          <p className="mt-2 text-sm text-slate-600">
            Explore platform strengths, weaknesses, and who should adopt it first.
          </p>
        </Link>
        <Link
          href="/compare"
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300"
        >
          <h3 className="text-xl font-semibold">Head-to-head comparison</h3>
          <p className="mt-2 text-sm text-slate-600">
            Break down trade-offs between top options before you commit.
          </p>
        </Link>
      </section>
    </div>
  );
}
