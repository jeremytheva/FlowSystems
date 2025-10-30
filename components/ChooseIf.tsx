interface ChooseIfProps {
  choose: string[];
  skip: string[];
}

export function ChooseIf({ choose, skip }: ChooseIfProps) {
  return (
    <div className="grid gap-6 rounded-xl border border-slate-200 bg-white/80 p-6 shadow-sm md:grid-cols-2">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-600">Choose if</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {choose.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary-500" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Skip if</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {skip.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-slate-400" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
