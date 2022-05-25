const less = require('less');
const externalArr = ['react', 'react-dom', 'react-is','lodash','antd','react-csv','@ant-design/icons'];
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-is': 'reactIs',
  '@ant-design/icons': 'icons',
  'react/jsx-runtime': 'react/jsx-runtime',
  "lodash": 'lodash',
  "react-csv":"reactCsv",
}
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


export {
  externalArr,
  globals,
  processLess
} ;