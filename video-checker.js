const puppeteer = require('puppeteer');

(async () => {

    // let story_url = 'https://spectacularnwt.com/what-to-do/fishing/arctic-char';
    // let story_url = 'https://spectacularnwt.com/story/bleeping-big-fish-nsfw-angling-northwest-territories';
    let story_url = 'https://spectacularnwt.com/story/21-record-breaking-things-northwest-territories';

    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    await page.goto(story_url, { waitUntil: 'networkidle2' });

    let data = await page.evaluate(() => {

        let page_contains_video = false;

        let article_sections = document.querySelectorAll('section[itemprop="articleSection"]');

        article_sections.forEach(article_section => {
            
            if (article_section.classList.contains("mediastack--video")) {
                page_contains_video = true;
            } else {
                page_contains_video = false;
            }
            return page_contains_video;
        });

        return {
            page_contains_video
        }

    })

    console.log(data);

    debugger;

    await browser.close();

})();