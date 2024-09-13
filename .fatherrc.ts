export default {
  platform: "browser",
  esm: {
    input: 'lib',
    transformer: "babel",
    output: "dist/esm",
  },
  cjs: {
    input: 'lib',
    transformer: "babel",
    output: "dist/cjs",
  },
  // umd: {
  //   entry: "src/index", // 默认构建入口文件
  //   output: "dist/umd",
  //   externals: {
  //     react: "React",
  //     "react-dom": "ReactDOM",
  //     // 'lodash-es': 'lodash-es',
  //   },
  // },
  // prebundle: {
  //   // 只配置要预打包的依赖
  //   deps: ['lodash-es'],

  //   // 配置预打包的依赖并指定详细配置
  //   deps: {
  //     'lodash-es': { minify: false },
  //     // 'react': { minify: false },
  //   },
  //   // extraExternals: {
  //   //   'lodash-es': 'lodash-es',
  //   // },
  // },
  autoprefixer: {
    browsers: ["last 2 version", "> 0.2%", "not dead", "not op_mini all"],
  },
};
