const fs = require("fs");
const path = require("path");
const {titleCase} = require("../util");


const createComponentsEntry = () => {
  const url = process.cwd();
  const filesArray = fs.readdirSync(path.resolve(`${url}/src/components`));
  let entryFiles = tips;
  let entryFilesComponentsLess = tips;
  let entryFilesComponents = tips;
  const componentNameArray = [];
  for (let file = 0; file < filesArray.length; file++) {
    componentNameArray.push(titleCase(filesArray[file]));
    entryFiles += `export { default as ${componentNameArray[file]} } from './components/${filesArray[file]}/${filesArray[file]}.component';\n`;
    entryFilesComponentsLess += `@import '../components/${filesArray[file]}/style/index.less';\n`;
   
  }
  entryFilesComponents = `import './components.less';\nimport './index.less';\n`;
  fs.writeFileSync(path.resolve(`${url}/src/index.tsx`), entryFiles);
  fs.writeFileSync(path.resolve(`${url}/src/theme/index.ts`), entryFilesComponents);
  fs.writeFileSync(path.resolve(`${url}/src/theme/components.less`), entryFilesComponentsLess);
};

module.exports = createComponentsEntry;