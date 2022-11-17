const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  // babel: {
  //   plugins: [
  //     [
  //       "import",
  //       {
  //         libraryName: "antd",
  //         libraryDirectory: "es",
  //         style: "true",
  //       },
  //     ],
  //   ],
  // },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#1DA57A",
        },
      },
    },
  ],
};
