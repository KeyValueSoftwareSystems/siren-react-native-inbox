/* eslint-disable no-undef */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-plusplus': 'off',
    'comma-dangle': ['off'],
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        vars: 'local'
      }
    ],
    'no-shadow': 'off',
    'implicit-arrow-linebreak': 'off',
    'space-before-blocks': 'error',
    'function-paren-newline': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return'
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*'
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      }
    ],
    'object-curly-newline': 'off',
    'func-call-spacing': 'off',
    'operator-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'no-spaced-func': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    indent: ["error", 2, { "SwitchCase": 1}],
    curly: ['error', 'multi', 'consistent'],
    'no-confusing-arrow': 'off',
    'nonblock-statement-body-position': 'off',
    '@typescript-eslint/no-explicit-any': 'error'
  }
};