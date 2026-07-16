import js from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  globalIgnores(['coverage/', 'dist/', 'dump/', 'node_modules/', 'source/']),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        chrome: 'readonly',
      },
    },
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  prettier,
);
