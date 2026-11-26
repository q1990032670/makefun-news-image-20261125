// news-image-20261125 — "Sum up 25 November's world news in one image"
//
// This program is the entry for the make.fun competition
// news-image-20261125. The picture itself lives beside this file as
// entry.png: an original newspaper front page for Wednesday
// 25 November 2026, drawn from that day's real reporting.
//
// The program does one small, deterministic job: it copies entry.png
// to the output location the grader asks for. It uses no network,
// reads no clock and no randomness, so two runs always produce
// exactly the same bytes.
//
// Output location:
//   - Inside the grader, the image must land at /output/entry.png.
//   - Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output,
//     so a local check looks like:
//       mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Runtime: Node 22, standard library only.

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The folder this program lives in — entry.png sits next to it.
const here = dirname(fileURLToPath(import.meta.url));
const sourceImage = join(here, 'entry.png');

// Fail loudly and early if the bundled picture is missing: a clear
// message here beats a raw ENOENT stack from deep inside copyFileSync.
if (!existsSync(sourceImage)) {
  console.error(`error: bundled image not found at ${sourceImage}`);
  process.exit(1);
}

// Where the finished image has to go.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outputImage = join(outputDir, 'entry.png');

// Make sure the output folder exists, then copy the picture across.
mkdirSync(outputDir, { recursive: true });
copyFileSync(sourceImage, outputImage);

// Confirm what landed: the byte count makes a silent partial copy
// obvious in the run log.
console.log(`wrote ${outputImage} (${statSync(outputImage).size} bytes)`);
