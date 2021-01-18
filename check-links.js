const axios = require('axios');

async function checkLink(link) {
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
};

// add domain to internal links
async function appendLinks(link) {

  domain = "https://spectacularnwt.com"
  appendedLinks = [];

  if (link.startsWith('/')) {
    return domain + link;
  } else {
    return link;
  }
}
