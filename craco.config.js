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
              // "@primary-color": "#3AAFA9",
              "@primary-color": "#455A64",
              "@font-family": "'Poppins', sans-serif",
              "@font-size-base": "14px",
              "@border-radius-base": "5px",
            },
          },
        },
      },
    },
  ],
};
