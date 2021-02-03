module.exports = {
  // sass-loader
  // https://vue-loader.vuejs.org/zh/guide/pre-processors.html#sass
  css: {
    extract: false,
    sourceMap: false,
    loaderOptions: {
      sass: {
        // https://webpack.docschina.org/loaders/sass-loader/#options
        // https://webpack.docschina.org/loaders/sass-loader/#additionaldata
        // https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: '@import "@/assets/style/_variables.scss";',
      },
    },
  },
};
