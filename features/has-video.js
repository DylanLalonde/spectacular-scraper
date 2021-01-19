const { contains } = require("cheerio");

async function hasVideo(page) {
  let data = await page.evaluate(() => {

    let contains_iframe = false;
    let contains_video  = false;

    let article_sections = document.querySelectorAll('section[itemprop="articleSection"]');
    let iframe_count = document.querySelectorAll("iframe").length;

    if (iframe_count > 3) {
      contains_iframe = true;
    } else {
      contains_iframe = false;
    }
    
    article_sections.forEach(article_section => {
      if (article_section.classList.contains("mediastack--video")) {
        contains_video = true;
      } else {
        contains_video = false;
      }
    });
    
    if (contains_iframe == true || contains_video == true) {
      return true;
    } else {
      return false;
    }
  });
  return data;
}

module.exports = hasVideo;