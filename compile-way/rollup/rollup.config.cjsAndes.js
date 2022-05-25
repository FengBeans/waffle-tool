import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';
import multiInput from 'rollup-plugin-multi-input';
import React from 'react';
import ReactIs from 'react-is';
import ReactDOM from 'react-dom';
import ts from 'typescript';
import { externalArr, globals, processLess } from './rollup.global.options';
const { babel } = require('@rollup/plugin-babel');

export default [
  {
    input: ['src/**/*.ts', 'src/**/*.tsx'],
    output: [
      { dir: './esm', format: 'es', export: 'auto' },
      { dir: './lib', format: 'cjs', export: 'auto' },
    ],
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
      multiInput(),
    ],
    external: externalArr,
    globals: globals,
  },
];
