const path = require('path');
const { whenProd } = require('@craco/craco');
const cssnano = require('cssnano');

const resolveAliasPath = (dir = '') => {
  return path.resolve(__dirname, dir.startsWith('src') ? dir : `src/${dir}`);
};

module.exports = {
  eslint: {
    mode: 'file',
  },
  webpack: {
    alias: {
      assets: resolveAliasPath('assets'),
      core: resolveAliasPath('core'),
      pages: resolveAliasPath('pages'),
      store: resolveAliasPath('store'),
      components: resolveAliasPath('components'),
      hook: resolveAliasPath('hook'),
      locales: resolveAliasPath('locales'),
    },
    configure: (webpackConfig) => {
      return webpackConfig;
    },
  },
  style: {
    postcss: {
      plugins: (plugins) => whenProd(() => [...plugins, cssnano], []),
    },
  },
};
