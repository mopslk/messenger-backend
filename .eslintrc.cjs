module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-underscore-dangle': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'key-spacing': [
      'error',
      {
        align: {
          beforeColon: true,
          afterColon: true,
          on: 'colon',
        },
      },
    ],
    'max-len': ['error', 150],
    'no-shadow': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'no-spaced-func': 'off',
    'no-unused-vars': 'off',
    'linebreak-style': ['error', 'unix'],
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-multi-spaces': ['error', { exceptions: { 'Program': true } }],
    'indent': ['error', 2, { 'SwitchCase': 1, 'ignoredNodes': ['PropertyDefinition'] }],
    '@typescript-eslint/indent': 'off',
    'import/no-extraneous-dependencies' : 'off',
  },
};
