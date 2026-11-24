import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';
import pkg from './package.json' with { type: 'json' };

const external = ['node:path', 'less', /^@stencil\//];

export default defineConfig([
  // Main entry
  {
    input: 'src/index.ts',
    external,
    output: [
      { format: 'cjs', file: pkg.main },
      { format: 'esm', file: pkg.module },
    ],
  },
  // Stencil CLI setup wizard
  {
    input: 'src/wizard.ts',
    external,
    output: [
      { format: 'esm', file: pkg.stencil.wizard },
    ],
  },
  // Type declarations
  {
    input: { index: 'src/index.ts', wizard: 'src/wizard.ts' },
    external,
    plugins: [dts({ dtsOnly: true, isolatedDeclarations: true })],
    output: { format: 'esm', dir: 'dist' },
  },
]);
