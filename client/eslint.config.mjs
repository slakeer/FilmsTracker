import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginJest from 'eslint-plugin-jest';
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
  { languageOptions: { globals: { ...globals.browser, ...globals.jest } } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettier, // Очищає конфлікти між ESLint і Prettier
  {
    plugins: {
      prettier: pluginPrettier,
      jest: pluginJest
    }

    // rules: {
    //   'no-use-before-define': 'off',
    //   'react-hooks/exhaustive-deps': 'off'
    // }
  }
];
