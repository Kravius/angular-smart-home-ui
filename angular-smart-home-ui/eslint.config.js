// eslint.config.js
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import angular from '@angular-eslint/eslint-plugin';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

export default [
  {
    files: ['**/*.ts'],
    // ignores: ['**/*.html'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      '@typescript-eslint': tseslint,
      '@angular-eslint': angular,
      unicorn,
    },

    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      ...unicorn.configs.recommended.rules,
      // Angular naming
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],

      // Disable this unicorn rule because Angular main.ts uses promises
      'unicorn/prefer-top-level-await': 'off',
    },
  },
];
