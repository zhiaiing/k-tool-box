// const resolve = require("@rollup/plugin-node-resolve");
// const postcss = require("rollup-plugin-postcss");
// const typescript = require("@rollup/plugin-typescript");
// const commonjs = require("@rollup/plugin-commonjs");
// const { babel } = require("@rollup/plugin-babel");

import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';

const config = [
  {
    input: "./src/index.ts",
    output: {
      file: "./dist/bundle.js",
      format: "cjs",
    },
    plugins: [
      resolve({
        extensions: [".js", ".ts", ".jsx", ".tsx"],
        moduleDirectories: ['node_modules'],
        preferBuiltins: false,
        dedupe: ['lodash-es'], 
      }),
      commonjs(),
      postcss(),
      typescript(),
      babel({
        presets: ["@babel/preset-react"],
        exclude: /node_module/,
      }),
    ],

    external: ["react", "react-dom", "react/jsx-runtime"],
  },
];

export default config;
