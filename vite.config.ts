import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import postCssPxToRem from 'postcss-pxtorem'
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    UnoCSS(),
    react(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [
        // postcsspxtoviewport({
        //   unitToConvert: 'px', // 要转化的单位
        //   viewportWidth: 375, // UI设计稿的宽度
        //   unitPrecision: 6, // 转换后的精度，即小数点位数
        //   propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        //   viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
        //   fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
        //   selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
        //   minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
        //   mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
        //   replace: true, // 是否转换后直接更换属性值
        //   exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
        //   // exclude: [],
        //   landscape: false, // 是否处理横屏情况
        // }),
        // postCssPxToRem({
        //   // rootValue({ file }: any) {
        //   //   console.log('############# ', file);
        //   //   return file.indexOf('vant') !== -1 ? 37.5 : 75;
        //   // },
        //   rootValue: 75,
        //   propList: ['*'],
        //   selectorBlackList: [],
        // }),
      ],
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        // target: 'http://172.20.10.7:9020',
        target: 'http://192.168.2.205:18135/',
        // target: 'http://192.168.2.114:8135/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // bypass(req, res, options: any) {
        //   const proxyURL = options.target + options.rewrite(req.url);
        //   res.setHeader('x-req-proxyURL', proxyURL);
        // },
      },
    },
  },
})
