import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';
import multiInput from 'rollup-plugin-multi-input';
import React from 'react';
import ReactIs from 'react-is';
import ReactDOM from 'react-dom';
const { babel } = require('@rollup/plugin-babel');
const packageJson = require('./package.json');
const less = require('less');

const processLess = function (context, payload) {
  return new Promise((resolve, reject) => {
    less.render(
      {
        file: context,
      },
      function (err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
    less.render(context, {}).then(
      function (output) {
        if (output && output.css) {
          resolve(output.css);
        } else {
          reject({});
        }
      },
      function (err) {
        reject(err);
      }
    );
  });
};

const externalArr = ['react', 'react-dom', 'react-is','lodash','antd','react-csv','@ant-design/icons']

export default [
  {
    input: 'src/index.tsx',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: '@fengbeans/antd-waffle',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-is': 'reactIs',
        '@ant-design/icons': 'icons',
        'react/jsx-runtime': 'react/jsx-runtime',
        "lodash": 'lodash',
        "react-csv":"reactCsv",
        
      },
    },
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-is': 'reactIs',
      '@ant-design/icons': 'icons',
      'react/jsx-runtime': 'react/jsx-runtime',
      "lodash": 'lodash',
      "react-csv":"reactCsv",
      
    },
    plugins: [
      resolve(),
      typescript(),
      commonjs({
        sourceMap: false,
        namedExports: true,
        minimize: true,
        extract: true,
        external: ['less', 'css'],
        namedExports: {
          'react-is': Object.keys(ReactIs),
          'react': Object.keys(React),
          'react-dom': Object.keys(ReactDOM),
        }
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
      }),
      //multiInput(),
    ],
    external: externalArr,
  },
  // {
  //   input: ['src/**/*.ts', 'src/**/*.tsx'],
  //   output: [
  //     { dir: './build/cjs', format: 'cjs', export: 'auto' },
  //     { dir: './build/es', format: 'es' },
  //   ],
  //   plugins: [
  //     resolve(),
  //     typescript(),
  //     commonjs({
  //       sourceMap: false,
  //       namedExports: true,
  //       minimize: true,
  //       extract: true,
  //       external: ['less', 'css'],
  //       namedExports: {
  //         'react-is': Object.keys(ReactIs),
  //         'react': Object.keys(React),
  //         'react-dom': Object.keys(ReactDOM),
  //       }
  //     }),
  //     json(),
  //     postcss({
  //       extract: true,
  //       process: processLess,
  //       use: [['less', { javascriptEnabled: true }]],
  //     }),
  //     babel({
  //       babelrc: true,
  //       plugins: [['import', { libraryName: 'antd', style: true }]],
  //       extensions: ['.js', '.jsx', '.ts', '.tsx'],
  //       exclude: /\**node_modules\**/,
  //     }),
  //     multiInput(),
  //   ],
  //   external: externalArr,
  // },
];
