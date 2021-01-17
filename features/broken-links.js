async function brokenLinks(page) {
  let data = await page.evaluate(() => {
      
    // let contains_video = false;
    
    let broken_links = [];
    let article_section_contents = document.querySelectorAll('div.article-section-content p');

    // check each article section for videos
    article_section_contents.forEach(article_section_content => {

      console.log(article_section_content);
      // let links_to_check = [];

      // if (article_section.classList.contains("a")) {
      //   // contains_video = true;

      // } else {
      //   // contains_video = false;

      // }
    });
  
    // return contains_video;
    
  });

  return data;
};

module.exports = brokenLinks;