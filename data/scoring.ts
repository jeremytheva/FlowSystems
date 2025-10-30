export interface FactorWeight {
  key: string;
  weight: number;
  owner: string;
}

export const factorWeights: FactorWeight[] = [
  { key: 'time-to-value', weight: 0.3, owner: 'Jess' },
  { key: 'setup-effort', weight: 0.25, owner: 'Morgan' },
  { key: 'ecosystem', weight: 0.2, owner: 'Kai' },
  { key: 'support', weight: 0.15, owner: 'Jess' },
  { key: 'pricing', weight: 0.1, owner: 'Morgan' },
];
