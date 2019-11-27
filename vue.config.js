const path = require("path");
const glob = require("glob-all");
const CompressionPlugin = require("compression-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const SkeletonWebpackPlugin = require("vue-skeleton-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const productionGzipExtensions = ["js", "css"];
const isProduction = process.env.NODE_ENV === "production";
const isProductionBuild = process.env.VUE_APP_CURRENTMODE === "prod";
// const SentryWebpackPlugin = require("@sentry/webpack-plugin");
// const gitSha = require("child_process")
//   .execSync("git rev-parse HEAD")
//   .toString()
//   .trim(); //这个是获取提交版本的记录

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  // 基本路径
  publicPath: "./",
  // 输出文件目录
  outputDir: isProductionBuild ? "dist" : "pre",
  // 生产环境sourceMap
  productionSourceMap: true,
  //此插件需要css分离
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // webpack配置
  configureWebpack: config => {
    // 使用cdn
    // config.externals = {
    //   vue: "Vue",
    //   "vue-router": "VueRouter"
    // };

    // config.plugins.push(
    //   new SentryWebpackPlugin({
    //     include: "./pre/", // sourcemap文件目录位置
    //     // dryRun: process.env.VUE_APP_CURRENTMODE == "test", // 非生产环境空跑（不上传sourcemap等文件）
    //     release: gitSha, // 必须，建议使用git commit版本号；如果项目有使用tag release版本，这样最好。
    //     urlPrefix: "~/" // 上传文件路径，和线上保持一致。“~” 等价于 location.origin
    //   })
    // );

    // 骨架屏
    config.plugins.push(
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, "./src/skeleton.js")
          }
        },
        minimize: true,
        quiet: true,
        router: {
          mode: "hash",
          routes: [
            {
              path: "/wallet", //和router.js中的路径一样就行
              skeletonId: "skeleton1" //之前的id
            },
            {
              path: "/withdraw",
              skeletonId: "skeleton2"
            }
          ]
        }
      })
    );
    if (isProduction) {
      // 利用splitChunks单独打包第三方模块
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            echartsVenodr: {
              // 异步加载echarts包
              test: /(echarts|zrender)/,
              priority: 100, // 高于async-commons优先级
              name: "echartsVenodr",
              chunks: "async"
            }
            // styles: {
            //   name: "styles",
            //   test: /\.css$/,
            //   chunks: "all",
            //   enforce: true //忽略splitChunks的其他配置，强制将匹配到的缓存组中的文件合并为一个styles.css文件
            // }
          }
        }
      };
      // 打包分析工具
      config.plugins.push(new BundleAnalyzerPlugin());
      // 打包生产.gz包
      config.plugins.push(
        new CompressionPlugin({
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8
        })
      );
      // 删除多余css
      config.plugins.push(
        new PurgecssPlugin({
          paths: glob.sync([resolve("./**/*.vue")]),
          extractors: [
            {
              extractor: class Extractor {
                static extract(content) {
                  const validSection = content.replace(
                    /<style([\s\S]*?)<\/style>+/gim,
                    ""
                  );
                  return (
                    validSection.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
                  );
                }
              },
              extensions: ["html", "vue"]
            }
          ],
          whitelist: ["html", "body"],
          whitelistPatterns: [
            /el-.*/,
            /-(leave|enter|appear)(|-(to|from|active))$/,
            /^(?!cursor-move).+-move$/,
            /^router-link(|-exact)-active$/
          ],
          whitelistPatternsChildren: [/^token/, /^pre/, /^code/]
        })
      );
    }
  },
  chainWebpack: config => {
    config.plugins.delete("prefetch");
    if (isProduction) {
      config.module
        .rule("images")
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({
          bypassOnDebug: true
        })
        .end();
      // config.optimization.delete("splitChunks");
    }
  },

  // 第三方插件配置
  pluginOptions: {}
};
