module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: __dirname + '/dist'
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  target: 'node'
};
