const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        chrome: "58",
        ie: "11"
      },
      useBuiltIns: "usage",
      corejs: "core-js@3"
    }
  ],
  "@babel/preset-react",
  "@babel/preset-typescript",
];
const plugins = [
  [
    "@babel/plugin-proposal-decorators",
    {
      legacy: true
    }
  ],
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-syntax-dynamic-import",
  [
    "@babel/plugin-transform-runtime",
    {
      helpers: false,
      regenerator: true,
      corejs: 2
    }
  ],
  // [
  //   "import",
  //   {
  //     libraryName: "antd",
  //     style: true
  //   },
  //   "antd"
  // ],
];
// if (process.env["BABEL_ENV"] && process.env["BABEL_ENV"] === "production") {
//   plugins.push(
//     [
//       "@babel/plugin-transform-modules-systemjs",
//       {
//         // outputs SystemJS.register(...)
//         "systemGlobal": "SystemJS"
//       }
//     ]
//   )
// }
module.exports = {
  presets,
  plugins
};
