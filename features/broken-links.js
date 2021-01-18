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
  broken_links.push(await checkLink(links_to_check));
  // return broken_links;
  console.log(broken_links);
};  


async function checkLink(links_to_check) {
  
  // let broken_links_on_page = [];
  
  for (const link of links_to_check) {
    console.log("checking link: " + link)
    try {
      const res = await axios.get(link);

      if (res.status == 200 || res.status == 201 || res.status == 202) {
        console.log('Link is up! Status: ' + res.status)
      }
    } catch (err) {
        // Handle Error Here
      if (err.code == 'ECONNRESET') {
        console.log('Uh oh, link is down: ' + err.code)
        return err.code;
      }
      if (err.response.status == 401 || err.response.status == 403) {
        console.log('Uh oh, not authorized to view link: ' + err.response.status)
        return err.response.status;
      }
      if (err.response.status == 301 || err.response.status == 302) {
        console.log('Link is redirecting us:' + err);
        return err.response.status;
      } else {
        console.log('Link is down, error message:' + err);
        return err;
      }
    }
  }
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