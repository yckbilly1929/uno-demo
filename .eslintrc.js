module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
      modules: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'function-expression',
      },
    ],
    'react/no-unstable-nested-components': [
      'error',
      {
        allowAsProps: true, // TODO: does it ignore check of frequent re-rendering?
      },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-wrap-multilines': ['error', { arrow: true, return: true, declaration: true }],
    'react/jsx-no-useless-fragment': 'off', // TODO: for readability?
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    // TODO: better with explicit prop types definition
    'react/prop-types': [2, { ignore: ['children'] }],
    // TODO: update when react-scripts updated jsx toolings
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    'max-len': ['error', { code: 120 }],
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    'quote-props': ['error', 'consistent'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'object-curly-newline': [
      'error',
      {
        consistent: true,
      },
    ],
    'no-confusing-arrow': ['error', { allowParens: true }],
    'arrow-parens': ['error', 'always'],
    'no-param-reassign': ['error', { props: false }],
    'no-var': 'error',
    'no-eval': 'error',
    'no-unused-vars': 'off',
    'eqeqeq': ['error', 'always', { null: 'ignore' }],
    // TODO: or with max-len limit
    'arrow-body-style': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    '@typescript-eslint/no-non-null-assertion': 'error',
    // TODO: update when react-scripts updated jsx toolings
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-redeclare': ['error'],
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      },
    },
  },
}
