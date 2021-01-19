const { contains } = require("cheerio");

async function hasVideo(page) {
  let data = await page.evaluate(() => {
    
    let content_main = document.querySelector("#contentMain");
    let iframes_in_content_main = content_main.querySelectorAll('iframe');

    return iframes_in_content_main.length;
  });
  return data;
}

module.exports = hasVideo;