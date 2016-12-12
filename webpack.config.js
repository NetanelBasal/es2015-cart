module.exports = {
  entry : './src/main.js',
  output: {
    path    : './src',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [{
      test   : /\.js$/,
      exclude: /node_modules/,
      loader : 'babel-loader'
    }]
  }
};

// "presets": [ "es2015" ]