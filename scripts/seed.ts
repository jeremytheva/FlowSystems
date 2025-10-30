import fs from 'node:fs/promises';
import path from 'node:path';

async function ensureWeights() {
  const weightsSource = path.join(process.cwd(), 'seeds', 'weights.json');
  const weightsTarget = path.join(process.cwd(), 'public', 'data', 'weights.json');
  const data = await fs.readFile(weightsSource, 'utf8');
  await fs.mkdir(path.dirname(weightsTarget), { recursive: true });
  await fs.writeFile(weightsTarget, data, 'utf8');
  console.log('Seeded weights to public/data/weights.json');
}

async function main() {
  await ensureWeights();
  console.log('Seed complete.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
