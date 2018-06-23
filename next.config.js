// next.config.js;
const withCSS = require('@zeit/next-css');
const glob = require('glob');

module.exports = {
  ...withCSS(),
  exportPathMap: () => {
    const pathMap = {};
    glob.sync('pages/**/*.js', { ignore: 'pages/_app.js' }).forEach(s => {
      const path = s.split(/(pages|\.)/)[2].replace(/^\/index$/, '/');
      pathMap[path] = { page: path };
    });
    return pathMap;
  }
};
