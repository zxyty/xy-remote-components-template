const path = require("path");
const glob = require("glob");
// const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const common = require("./common");

const paths = {
    root: path.join(__dirname, '..'),
    src: path.join(__dirname, '..', 'src'),
    dist: path.join(__dirname, '..', 'dist'),
};

const getParentDirName = (filePath) => {
    const b = path.resolve(filePath, "../../");
    const c = path.resolve(filePath, "../");
    return path.basename(c.replace(b, ""));
}

const entry = (() => {
    const entryReactComponentsFiles = [
      ...(glob.sync(`${paths.src}/components/**/index.tsx`) || []),
    ];
    const entryVueComponentsFiles = [
      ...(glob.sync(`${paths.src}/components/**/index.vue`) || []),
    ];
    const entryJsMap = {};

    entryReactComponentsFiles.forEach(filepath => {
      const fileName = path.basename(filepath, '.tsx').toLocaleLowerCase();
      const parentName = getParentDirName(filepath);
      entryJsMap[`${parentName}/${fileName}`] = filepath;
    });
    entryVueComponentsFiles.forEach(filepath => {
      const fileName = path.basename(filepath, '.vue').toLocaleLowerCase();
      const parentName = getParentDirName(filepath);
      entryJsMap[`${parentName}/${fileName}`] = filepath;
    });
    return { entryJsMap };
})();

module.exports = {
  mode: "production",

  entry: entry.entryJsMap,
  
  output: {
    path: paths.dist,
    filename: '[name].js',
    libraryTarget: 'system',
  },

  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css"
    }),

    new VueLoaderPlugin(),

    new CopyWebpackPlugin(
      common.copyPluginConfig.patterns,
      common.copyPluginConfig.options
    ),
  ],

  module: {
    rules: [
      common.jsLoader,
      common.vueLoader,
      common.fileLoader,
      common.urlLoader,
      common.lessLoaderSrc,
      common.lessLoaderNodeModules,
    ]
  },

  externals: {
    'moment': 'moment',
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    ...common.resolve
  }
};
