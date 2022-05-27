const waffle = require(`${process.cwd()}/.waffle.ts`);
const createComponentsEntry = require('./auto-entry/create-components-entry')

module.exports = function config() {
  if(waffle.autoEntry){
    createComponentsEntry();
  }
  if(waffle.build==='rollup'){
    return
  }
}


