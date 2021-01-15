const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const input_json_data = require('./data/test-data.json');

const output_json_data = [];


for (let i = 0; i < input_json_data.length; i++) {

  request(input_json_data[i].url, (err, response, html) => {
  // request(input_json_data[1].url, (err, response, html) => {
    
    const newDataObject = {};
    newDataObject["url"] = input_json_data[i].url;

    if(!err && response.statusCode == 200) {
      
      const $ = cheerio.load(html);
      const articleSection = $('.article-section')

      if (video.length > 0) {
        newDataObject["contains_video"] = true;
      } else {
        newDataObject["contains_video"] = false;
      }
    }

    output_json_data.push(newDataObject);
    console.log(output_json_data);
  });

}



/*
Helper Functions
*/

function jsonReader(filePath, callback) {
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