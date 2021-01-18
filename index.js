const puppeteer = require('puppeteer');
const io = require('./io/io.js');
const brokenLinks = require('./features/broken-links.js');
const hasVideo = require('./features/has-video.js');
const missingRelated = require('./features/missing-related.js');



init();

function init() {
  io.readJson('./data/test-data.json', performUrlLookups);
    
  async function performUrlLookups (err, jsonData) {
    let new_data = [];
  
    if (err) return console.log(err);
  
    for (let i = 0; i < jsonData.length; i++) {
  
      let story_url = jsonData[i].url;
      
      console.log("checking new story: ", story_url);
      
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(story_url, { waitUntil: 'networkidle2' });
      
      new_data.push(await getScrapedData(page, story_url));
  
      await browser.close();

      // io.writeData(new_data); // overwrites the file each time
    }
    io.writeData(new_data); // only writes once at the end
  };
  
  async function getScrapedData(page, story_url) {
    // creating the new object to stringify/store
    let scrapedUrlInfo = {};
    
    // store data about articles containing videos into json file
    scrapedUrlInfo["url"] = story_url;
    scrapedUrlInfo["contains_video"] = await hasVideo(page);
    scrapedUrlInfo["broken_links"] = await brokenLinks(page);
    scrapedUrlInfo["missing_related"] = await missingRelated(page);
    
    return scrapedUrlInfo;
  }
}

