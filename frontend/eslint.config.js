import eslint from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
    eslint.configs.recommended,
    {
        files: ['**/*.{js,jsx}'],
        ignores: ['**/node_modules/**', 'dist/**', 'build/**', '.vite/**'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        plugins: {
            react,
            'react-hooks': reactHooks
        },
        settings: {
            react: {
                version: 'detect'
            }
        },
        rules: {
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'jsx-quotes': ['error', 'single'],
            'indent': ['error', 4],
            'no-console': ['warn', { allow: ['error'] }],
            'no-unused-vars': 'warn',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn'
        }
    }
];
