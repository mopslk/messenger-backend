module.exports = {
  env: {
    es2021 : true,
    node   : true,
  },
  parserOptions: {
    ecmaVersion     : 'latest',
    parser          : '@typescript-eslint/parser',
    sourceType      : 'module',
    tsconfigRootDir : __dirname,
    project         : './tsconfig.json',
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  plugins: [
    'import',
    '@typescript-eslint',
  ],
  rules: {
    'no-console'           : 'off',
    'no-underscore-dangle' : 'off',
    'comma-dangle'         : ['error', 'always-multiline'],
    'key-spacing'          : ['error', {
      align: {
        beforeColon : true,
        afterColon  : true,
        on          : 'colon',
      },
    }],
    'max-len'                           : ['error', 150],
    'no-shadow'                         : 'off',
    'class-methods-use-this'            : 'off',
    '@typescript-eslint/no-shadow'      : 'off',
    'import/extensions'                 : ['error', 'ignorePackages', { ts: 'never' }],
    'import/no-extraneous-dependencies' : ['error', { devDependencies: true }],
    'no-spaced-func'                    : 'off',
    'no-unused-vars'                    : 'off',
    'linebreak-style'                   : ['error', 'unix'],
    '@typescript-eslint/no-unused-vars' : [
      'error',
      {
        argsIgnorePattern         : '^_',
        varsIgnorePattern         : '^_',
        caughtErrorsIgnorePattern : '^_',
      },
    ],
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes : true,
        project        : __dirname,
      },
    },
  },
};
