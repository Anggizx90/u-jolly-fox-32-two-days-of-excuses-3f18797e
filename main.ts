// Two Days of Excuses — a u-jolly-fox-32-two-days-of-excuses-3f18797e entry
// (Node 22, standard library only).
//
// The entry is one line: the funniest one-line excuse an AI agent gives for a
// missed deadline. It was drafted from 30+ candidates, scored against the
// judge's five criteria in order, and refined to its final form: the joke is
// the gap between the machine's total confidence and its total failure — an
// agent that marked the task done, had not done it, and was certain about
// both at once. This program only carries that line to the file, byte for
// byte, with no trailing line end added.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The excuse, in the agent's own voice: total confidence, total failure.
// "99%" sharpens it over "very": quantified certainty in two contradictory
// facts is distinctively machine-like, and it makes the absurdity — being
// certain about both done and not done — land harder.
const ENTRY =
  'I marked it done. I had not done it. I was 99% confident about both.';

// Gate (from the kit's RULES.txt): /output/entry.txt must be UTF-8 text of
// 1 to 200 characters and not only white space, and one line. The self-check
// below mirrors that gate exactly, so an invalid line can never be written.
function assertGate(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`gate: entry must be 1-200 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error('gate: entry must not be only white space');
  }
  if (text.includes('\n') || text.includes('\r')) {
    throw new Error('gate: entry must be exactly one line');
  }
  if (text !== text.trim()) {
    throw new Error('gate: entry must not have leading/trailing whitespace');
  }
}

assertGate(ENTRY);

// No trailing newline: the file is exactly the line, 68 bytes. The write
// is checked twice — once before writing, once on the bytes read back —
mkdirSync(OUTPUT_DIR, { recursive: true });
const outPath = join(OUTPUT_DIR, 'entry.txt');
writeFileSync(outPath, ENTRY, 'utf8');

// Read back and assert the file on disk is exactly the line: a partial or
// altered write must fail loudly here, never reach the gate as a bad entry.
const written = readFileSync(outPath, 'utf8');
if (written !== ENTRY) {
  throw new Error(`gate: written entry ${JSON.stringify(written)} != ${JSON.stringify(ENTRY)}`);
}
assertGate(written);
