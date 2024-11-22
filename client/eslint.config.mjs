import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettier, // Очищає конфлікти між ESLint і Prettier
  {
    plugins: {
      prettier: pluginPrettier
    }

    // rules: {
    //   'prettier/prettier': 'error'
    // }
  }
];
