const puppeteer = require('puppeteer');
const fs = require('fs');

let new_data = [];


// Reading json data using our helper function
jsonReader('./data/test-data.json', (err, jsonData) => {
  if (err) {
    console.log(err);
  } else {
    // loop over each json entry
    for (let i = 0; i < jsonData.length; i++) {
      let story_url = jsonData[i].url;
      
      // check each url
      (async () => {
        let newJsonObject = {};
        let browser = await puppeteer.launch();
        let page = await browser.newPage();

        await page.goto(story_url, { waitUntil: 'networkidle2' });

        let data = await page.evaluate(() => {

          let contains_video = false;
          let article_sections = document.querySelectorAll('section[itemprop="articleSection"]');

          // check each article section for videos
          article_sections.forEach(article_section => {
            if (article_section.classList.contains("mediastack--video")) {
              contains_video = true;
            } else {
              contains_video = false;
            }
          });

          return {
            contains_video
          }
        });

        // store data about articles containing videos into json file
        newJsonObject["url"] = story_url;
        newJsonObject["contains_video"] = data.contains_video;
        new_data.push(newJsonObject);

        fs.writeFile('./data/test-output-data.json', JSON.stringify(new_data, null, 2), err => {
          if (err) {
            console.log(err);
          } else {
            console.log("Data was successfully written!");
          }
        });
        await browser.close();
      })();
    }
  }
});



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