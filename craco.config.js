const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
              "@primary-color": "#3AAFA9",
              "@font-family": "'Poppins', sans-serif",
              "@font-size-base": "14px",
            },
          },
        },
      },
    },
  ],
};
