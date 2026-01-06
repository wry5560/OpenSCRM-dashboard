module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  customSyntax: 'postcss-less',
  rules: {
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'function-no-unknown': null,
    'import-notation': null,
    'alpha-value-notation': null,
    'color-function-notation': null,
  },
};
