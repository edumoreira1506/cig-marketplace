const { withGlobalCss } = require('next-global-css')

const withConfig = withGlobalCss()

module.exports = withConfig({
  reactStrictMode: true,
  pageExtensions: ['tsx'],
});
