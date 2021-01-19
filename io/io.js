const fs = require('fs');

function readJson(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, fileData) => {
    if (err) {
      return callback && callback(err);
    }
    try {
      const jsonObject = JSON.parse(fileData);
      return callback && callback(null, jsonObject);
    } catch (err) {
      return callback && callback(err);
    }
  });  
}

async function writeData(data) {
  fs.writeFile('./data/output-data.json', JSON.stringify(data, null, 2), err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Data was successfully written!");
    }
  });
}

module.exports = {
  readJson,
  writeData
}