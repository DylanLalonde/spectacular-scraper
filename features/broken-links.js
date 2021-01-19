const axios = require('axios');

async function brokenLinks(page) {
  const hrefs = await page.evaluate(() => {
      try {
        return Array.from(
          document.querySelectorAll('div.article-section-content p a[href]'), a => a.href)
      } catch (err) {
        console.log(err);
      }
    }
  );
  console.log("Links to check: " + hrefs.length);
  return await checkLink(hrefs);
};  


/**
 * Helper functions
 */
async function checkLink(links_to_check) {
  
  let broken_links_on_page = [];
  
  for (const link of links_to_check) {
    console.log("checking link: " + link)
    try {
      const res = await axios.get(link);

      if (res.status >= 200 && res.status <= 299) {
        console.log('Successful response: ' + res.status)
      }
      if (res.status >= 300 && res.status <= 399) {
        console.log('Redirecting: ' + res.status);
        broken_links_on_page.push(link);
      }
      if (res.status >= 400 && res.status <= 499) {
        console.log('Client error: ' + res.status)
        broken_links_on_page.push(link);
      }
      if (res.status >= 500 && res.status <= 599) {
        console.log('Server error: ' + res.status)
        broken_links_on_page.push(link);
      }
    } catch (err) {
      if (err.code == 'ECONNRESET') {
        console.log('Uh oh, link is down: ' + err.code)
        broken_links_on_page.push(link);
      } 
      if (err.response.status >= 400 && err.response.status <= 499) {
        console.log('Client error: ' + err.response.status)
        broken_links_on_page.push(link);
      }
      else {
        console.log(err);
        broken_links_on_page.push(link);
      }
    }
  }
  return broken_links_on_page;
};

module.exports = brokenLinks;