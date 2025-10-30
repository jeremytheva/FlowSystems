'use client';

import { track } from '@/lib/analytics';
import { useMemo, useState } from 'react';

const QUESTIONS = [
  {
    id: 'teamSize',
    prompt: 'How large is your core team?',
    options: [
      { value: 'solo', label: 'Just me' },
      { value: 'small', label: '2 – 5 people' },
      { value: 'growing', label: '6 – 15 people' },
    ],
  },
  {
    id: 'priority',
    prompt: 'What matters most this quarter?',
    options: [
      { value: 'setup', label: 'Launch quickly' },
      { value: 'automation', label: 'Automate manual work' },
      { value: 'reporting', label: 'Better visibility' },
    ],
  },
  {
    id: 'integrations',
    prompt: 'What do you need to connect?',
    options: [
      { value: 'calendars', label: 'Calendars & scheduling' },
      { value: 'billing', label: 'Billing & invoices' },
      { value: 'docs', label: 'Docs & knowledge' },
    ],
  },
] as const;

type Question = (typeof QUESTIONS)[number];

type Answers = {
  [Key in Question['id']]?: string;
};

export default function Wizard() {
  const [answers, setAnswers] = useState<Answers>({});

  const handleAnswer = (question: Question, option: Question['options'][number]) => {
    setAnswers((prev) => ({ ...prev, [question.id]: option.value }));
    track({ type: 'wizard:answered', payload: { question: question.id, value: option.value } });
  };

  const isComplete = QUESTIONS.every((question) => answers[question.id]);

  const recommendation = useMemo(() => {
    if (!isComplete) return null;
    const stage = answers.teamSize === 'solo' ? 'solo' : 'team';
    const focus = answers.priority ?? 'setup';
    return `Stage: ${stage.toUpperCase()} · Focus: ${focus}`;
  }, [answers, isComplete]);

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <ol className="flex flex-col gap-6">
        {QUESTIONS.map((question) => (
          <li key={question.id} className="flex flex-col gap-3">
            <span className="text-sm font-medium text-slate-700">{question.prompt}</span>
            <div className="flex flex-wrap gap-2">
              {question.options.map((option) => {
                const selected = answers[question.id] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleAnswer(question, option)}
                    className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                      selected
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
        {recommendation ? (
          <span className="font-semibold text-slate-800">Recommended signal preset: {recommendation}</span>
        ) : (
          <span>Answer the prompts to get a tailored scoring preset.</span>
        )}
      </div>
    </div>
  );
}
