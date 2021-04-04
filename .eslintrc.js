module.exports = {
  env: {
    node: true,
    es2017: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-useless-constructor': 'off',
    'max-len': ['error', { code: 200 }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'import/extensions': ['error', 'ignorePackages', { ts: 'never', json: 'never' }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-return-await': 'off',
    'class-methods-use-this': 'off',
    'arrow-body-style': 0,
    'object-curly-newline': 0,
    'no-continue': 'off',
    'no-await-in-loop': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
