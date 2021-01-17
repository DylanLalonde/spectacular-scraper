async function hasVideo(page) {
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
  
    return contains_video;
    
  });

  return data;
}

module.exports = hasVideo;