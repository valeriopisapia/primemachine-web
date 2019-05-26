// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true
  },
  extends: ['airbnb-base', 'vue'],
  // required to lint *.vue files
  plugins: ['html'],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never'
      }
    ],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js']
      }
    ],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow console.log during development
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    // disable quotes linting
    quotes: 0,
    'import/no-dynamic-require': 0,
    'global-require': 0,
    'prefer-template': 0,
    semi: ['error', 'never'],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true
      }
    ],
    'arrow-parens': 1,
    'space-before-function-paren': 1
  }
}
