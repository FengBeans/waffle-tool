const waffle = require(`${process.cwd()}/.waffle.ts`);
const autoEntryCore = require('./auto-entry/core')
const rollup = require('rollup');
const rollupUmd = require('./compile-way/rollup/rollup.config.umd')

module.exports = function config() {
  // console.log(waffle);
  // if(waffle.autoEntry){
  //   autoEntryCore();
  // }
  // if(waffle.build==='rollup'){
  //   rollup(rollupUmd)
  // }
  rollup(rollupUmd)
}


