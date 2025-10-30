export const metadata = {
  title: 'Newsletter',
  description: 'Get the latest reviews, comparison updates, and migration tactics in your inbox.',
};

export default function NewsletterPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Operator Signals</h1>
        <p className="max-w-2xl text-sm text-slate-600">
          A twice-monthly digest of new reviews, migration playbooks, and experiments from the FlowSystems community.
        </p>
      </header>
      <form className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row">
        <label className="flex-1 text-sm text-slate-600">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            required
            placeholder="you@company.com"
            className="w-full rounded-full border border-slate-200 px-4 py-2 focus:border-primary-500 focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-primary-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
        >
          Subscribe
        </button>
      </form>
      <ul className="space-y-4 text-sm text-slate-600">
        <li className="flex items-start gap-2">
          <span className="mt-1 h-2 w-2 rounded-full bg-primary-500" aria-hidden />
          <span>Highlights from the latest platform reviews and scoring updates.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 h-2 w-2 rounded-full bg-primary-500" aria-hidden />
          <span>Migrations we are studying and the hidden work involved.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 h-2 w-2 rounded-full bg-primary-500" aria-hidden />
          <span>Upcoming operator events and teardown sessions.</span>
        </li>
      </ul>
    </div>
  );
}
