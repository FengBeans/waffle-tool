import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';
import React from 'react';
import ReactIs from 'react-is';
import ReactDOM from 'react-dom';
import ts from 'typescript';
import { externalArr, globals, processLess } from './rollup.global.options';
const { babel } = require('@rollup/plugin-babel');

export default [
  {
    input: 'src/index.tsx',
    output: {
      file: './dist/index.js',
      format: 'umd',
      name: '@fengbeans/antd-waffle',
      sourcemap: true,
      globals: globals,
    },
    plugins: [
      resolve(),
      typescript({
        typescript: ts,
        tsconfig: 'tsconfig.json',
      }),
      commonjs({
        sourceMap: false,
        namedExports: true,
        minimize: true,
        extract: true,
        external: ['less', 'css'],
        namedExports: {
          'react-is': Object.keys(ReactIs),
          react: Object.keys(React),
          'react-dom': Object.keys(ReactDOM),
        },
      }),
      json(),
      postcss({
        extract: true,
        process: processLess,
        use: [['less', { javascriptEnabled: true }]],
      }),
      babel({
        babelrc: true,
        plugins: [['import', { libraryName: 'antd', style: true }]],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: /\**node_modules\**/,
        babelHelpers: 'runtime',
      }),
    ],
    external: externalArr,
  },
];
