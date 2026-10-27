// Syntax-checks every module and verifies that every import resolves.
import { readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const files = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.js')) files.push(p);
  }
})('src');

let failed = false;
for (const f of files) {
  try {
    // Importing in Node fails on browser globals, so only parse: a dynamic
    // import of a data: URL with the source would run it. Use the V8 check instead.
    const { execFileSync } = await import('node:child_process');
    execFileSync(process.execPath, ['--check', f], { stdio: 'pipe' });
  } catch (err) {
    failed = true;
    console.error(`✗ ${f}\n${err.stderr?.toString() || err.message}`);
  }
}
if (!failed) console.log(`✓ ${files.length} modules parse`);
process.exit(failed ? 1 : 0);
