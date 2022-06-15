const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.(sass|less)$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "less-loader",
          options: {
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
      ],
      include: path.resolve(__dirname, "../"),
    });

    return config;
  },
};
