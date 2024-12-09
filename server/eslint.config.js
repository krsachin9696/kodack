import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Keep browser globals
        ...globals.node, // Add Node.js globals
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      // Example rules for Node.js
      'no-console': 'warn', // Warn on console usage
      'callback-return': 'error', // Enforce return of callback functions
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Add more Node.js specific rules here
    },
  },
];
