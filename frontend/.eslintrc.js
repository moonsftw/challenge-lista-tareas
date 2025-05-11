module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    rules: {
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'jsx-quotes': ['error', 'prefer-single'],
        'indent': ['error', 4],
        'no-console': ['warn', { allow: ['error'] }],
        'no-unused-vars': 'warn'
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
};