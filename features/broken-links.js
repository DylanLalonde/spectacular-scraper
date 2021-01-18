const axios = require('axios');



async function brokenLinks(page) {

  const broken_links = [];

  const hrefs = await page.evaluate(
    () => Array.from(
      document.querySelectorAll('div.article-section-content p a[href]'),
      a => a.getAttribute('href')
    )
  );

  const links_to_check = await prependDomain(hrefs);
  console.log("Links to check: " + links_to_check);
  broken_links.push(await checkLink(links_to_check));
  console.log("Broken links: " + broken_links);
  return broken_links;
};  


async function checkLink(links_to_check) {
  
  let broken_links_on_page = [];
  
  for (const link of links_to_check) {
    console.log("checking link: " + link)
    try {
      const res = await axios.get(link);

      if (res.status == 200 || res.status == 201 || res.status == 202) {
        console.log('Link is up! Status: ' + res.status)
      }
      if (res.status == 301 || res.status == 302) {
        console.log('Link is redirecting us:' + res.status);
        broken_links_on_page.push(link);
      }
      if (res.status == 401 || res.status == 403) {
        console.log('Uh oh, not authorized to view link: ' + res.status)
        broken_links_on_page.push(link);
      }
    } catch (err) {
        // Handle Error Here
      if (err.code == 'ECONNRESET') {
        console.log('Uh oh, link is down: ' + err.code)
        broken_links_on_page.push(link);
      } else {
        console.log('Link is down, error message:' + err);
        // return err;
        broken_links_on_page.push(link);
      }
    }
  }
  return broken_links_on_page;
};

async function prependDomain(incoming_links) {

  domain = "https://spectacularnwt.com"
  prependedLinks = [];

  try {
    incoming_links.forEach(link => {
      if (link.startsWith('/')) {
        prependedLinks.push(domain + link);
      } else {
        prependedLinks.push(link);
      }
    });
    return prependedLinks;
  } catch (err) {
    console.log(err);
  }
}



module.exports = brokenLinks;