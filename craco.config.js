const { lessOptions } = require('./less.config');
const CracoLessPlugin = require('craco-less');
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          ...lessOptions,
        },
      },
    },
  ],
};
