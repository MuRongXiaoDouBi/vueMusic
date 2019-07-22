const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}


module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
      .set('pages', resolve('src/pages'))
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      },
      postcss: {
        plugins: [
          require('postcss-px2rem-exclude')({
            remUnit: 14,
            exclude:" /node_modules/i" | "/src/common/stylus/"
          }), // 换算的基数
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}