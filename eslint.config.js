const js = require('@eslint/js');
const globals = require('globals');
const tseslint = require('typescript-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = tseslint.config(
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    extends: [tseslint.configs.recommended],
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  {
    languageOptions: {
      ecmaVersion: 2023,
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.{js,cjs,mjs}'],
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  eslintConfigPrettier,
  {
    ignores: ['node_modules/', '**/node_modules/', 'dist/', '**/dist/', 'build/', 'coverage/'],
  }
);
