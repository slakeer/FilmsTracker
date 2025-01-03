import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginJest from 'eslint-plugin-jest';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest // Додаємо підтримку для Node.js
      }
    }
  },
  pluginJs.configs.recommended,
  prettier, // Очищає конфлікти між ESLint і Prettier
  {
    plugins: {
      prettier: pluginPrettier,
      jest: pluginJest
    }

    // rules: {
    //   'prettier/prettier': 'error'
    // }
  }
];
