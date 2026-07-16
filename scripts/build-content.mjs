import { build } from 'esbuild';

await build({
  entryPoints: ['src/content/main.ts'],
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['chrome120'],
  outfile: 'dist/content/main.js',
  logLevel: 'info',
});
