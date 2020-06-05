module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true,
    jest: true
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'linebreak-style': 0,
    'no-console': 0,
    'func-names': 0,
    'import/extensions': [ 
        'error',
        'ignorePackages',
        { 
          'js': 'never',
          'jsx': 'never',
          'ts': 'never',
          'tsx': 'never',
          'json': 'never'
          }
      ],
    'no-useless-concat': 0,
    'no-unused-vars': 1,
    'camelcase': 0
  },
  settings: {
    'import/resolver': {
        node: { 
            extensions: [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    }
};
