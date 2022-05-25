const waffle = require(`${process.cwd()}/.waffle.ts`);
const autoEntryCore = require('./auto-entry/core')

module.exports = function config() {
  if(waffle.autoEntry){
    autoEntryCore();
  }
  if(waffle.build==='rollup'){
    return
  }
}


