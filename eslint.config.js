import js from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  globalIgnores(['coverage/', 'dist/', 'dump/', 'node_modules/', 'source/']),
  js.configs.recommended,
  tseslint.configs.recommended,
  prettier,
);
