async function brokenLinks(page) {
  const hrefs = await page.evaluate(
    () => Array.from(
      document.querySelectorAll('div.article-section-content p a[href]'),
      a => a.getAttribute('href')
    )
  );

  console.log(hrefs);
  return hrefs;
};  

module.exports = brokenLinks;