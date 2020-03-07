/*
 * @Author: MuRong
 * @Date: 2020-03-07 17:22:00
 * @LastEditors: MuRong
 * @LastEditTime: 2020-03-07 18:29:58
 * @Description:
 * @FilePath: \vueMusic-master\vue.config.js
 */
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  assetsDir: "static",
  publicPath: process.env.NODE_ENV === "production" ? "/music/" : "",
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("common", resolve("src/common"))
      .set("components", resolve("src/components"))
      .set("api", resolve("src/api"))
      .set("pages", resolve("src/pages"));
  },

  css: {
    loaderOptions: {
      stylus: {
        "resolve url": true,
        import: ["./src/theme"]
      },
      postcss: {
        plugins: [
          require("postcss-px2rem-exclude")({
            remUnit: 14,
            exclude: " /node_modules/i" | "/src/common/stylus/"
          }) // 换算的基数
        ]
      }
    }
  },

  pluginOptions: {
    "cube-ui": {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    proxy: {
      "/musicApi": {
        target: "http://101.200.187.69:30000/", //代理接口
        changeOrigin: true,
        pathRewrite: {
          "^/musicApi": "" //代理的路径
        }
      }
    }
  }
};
