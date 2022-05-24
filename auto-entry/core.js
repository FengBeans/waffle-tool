const fs = require("fs");
const path = require("path");

const titleCase = (str) => {
  newStr = str.slice(0, 1).toUpperCase() + str.slice(1);
  return newStr;
};

const autoEntryCore = () => {
  const url = process.cwd();
  const filesArray = fs.readdirSync(path.resolve(`${url}/src/components`));
  let entryFiles = `//请勿手动更新文件，自动更新\n`;
  const componentNameArray = [];
  for (let file = 0; file < filesArray.length; file++) {
    componentNameArray.push(titleCase(filesArray[file]));
    entryFiles += `export { default as ${componentNameArray[file]} } from './components/${filesArray[file]}/${filesArray[file]}.component';\n`;
  }

  fs.writeFileSync(path.resolve(`${url}/src/index.tsx`), entryFiles);
};

module.exports = autoEntryCore;
