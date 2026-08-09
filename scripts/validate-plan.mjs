import { readFileSync } from 'node:fs';

const pins = JSON.parse(readFileSync(new URL('../source-pins.json', import.meta.url)));
const plan = JSON.parse(readFileSync(new URL('../test-plan.json', import.meta.url)));
const expectedSources = [
  'cliptown/cliptown-flutter',
  'cliptown/cliptown-interfaces',
];

if (plan.schemaVersion !== 1 || plan.repository !== 'desktop-tray-lifecycle-e2e') {
  throw new Error('Unexpected test-plan identity or schema version.');
}
if (!plan.security?.immutableSourcePins || !plan.security?.leastPrivilege) {
  throw new Error('The acceptance plan must require immutable pins and least privilege.');
}
if (plan.security?.capturesClipboardData !== false) {
  throw new Error('This lifecycle harness must not capture clipboard data.');
}
for (const source of expectedSources) {
  if (!/^[0-9a-f]{40}$/.test(pins[source] ?? '')) {
    throw new Error(`${source} is not pinned to a full commit SHA.`);
  }
}
if (Object.keys(pins).sort().join('\n') !== expectedSources.sort().join('\n')) {
  throw new Error('source-pins.json contains an unexpected source set.');
}

console.log('desktop tray lifecycle plan is valid');
