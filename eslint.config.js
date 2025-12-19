import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,

      // MUST be last: disables rules that conflict with Prettier
      eslintConfigPrettier,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      /* --------------------------------
       * Import order & grouping (ARCH)
       * -------------------------------- */
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. Node.js builtins (with node: prefix)
            ['^node:'],

            // 2. React and related packages
            ['^react$', '^react/', '^react-dom'],

            // 3. External libraries (MUI, router, i18n, etc.)
            ['^@?\\w'],

            // 4. App-level alias
            ['^@app(/.*|$)'],

            // 5. Shared modules
            ['^@shared(/.*|$)'],

            // 6. Features
            ['^@features(/.*|$)'],

            // 7. Store
            ['^@store(/.*|$)'],

            // 8. Assets
            ['^@assets(/.*|$)'],

            // 9. Relative imports
            ['^\\.'],

            // 10. Side effect imports (css, fonts, etc.)
            ['^\\u0000'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      /* --------------------------------
       * Unused imports & vars
       * -------------------------------- */
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
]);
