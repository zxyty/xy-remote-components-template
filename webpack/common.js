const { join } = require('path');
const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = {
  root: join(__dirname, '..'),
  src: join(__dirname, '..', 'src'),
  dist: join(__dirname, '..', 'dist'),
};

const entryWindow = (() => {
  const entryWindowFiles = [
    ...(glob.sync(`${paths.src}/window/*.tsx`) || []),
    ...(glob.sync(`${paths.src}/connector/*.tsx`) || []),
  ];
  const entryJsMap = {};
  const entryHtmls = [];
  entryWindowFiles.forEach(filepath => {
    const fileName = path.basename(filepath, '.tsx').toLocaleLowerCase();
    entryJsMap[fileName] = filepath;

    entryHtmls.push({
      title: '',
      template: join(paths.src, 'index.ejs'),
      filename: `${fileName}.html`,
      inject: false,
    });
  });
  return { entryJsMap, entryHtmls };
})();

module.exports = {
  paths,

  entry: entryWindow.entryJsMap,

  output: {
    path: paths.dist,
    filename: '[name].[contenthash].js',
    // libraryTarget: 'system',
  },

  copyPluginConfig: {
    patterns: [{ from: join(paths.root, 'public'), to: './' }],
  },

  htmlPluginConfig: entryWindow.entryHtmls,

  templateLoader: {
    test: /\.ejs$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ejs-loader',
      },
    ],
  },

  htmlLoader: {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
      },
    ],
  },

  jsLoader: {
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
      },
    ],
  },

  lessLoader: {
    test: /\.(le|c)ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: true, // not enable css module
        },
      },
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
        },
      },
    ],
  },

  fileLoader: {
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|txt)(\?.*)?$/,
    use: {
      loader: 'file-loader',
      options: {
        name: 'static/[name].[hash:8].[ext]',
      },
    },
  },

  urlLoader: {
    test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
    exclude: /node_modules/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'static/[name].[hash:8].[ext]',
      },
    },
  },

  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {},
  },
};
