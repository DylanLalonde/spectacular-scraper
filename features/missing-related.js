async function missingRelated(page) {
  let data = await page.evaluate(() => {
      
    let missing_related = false;
    let related_stories_section = document.querySelector('div[id=block-relatedstories]');

    if (related_stories_section == null) {
      missing_related = true;
    } else {
      missing_related = false;
    }
    
    return missing_related;
    
  });

  return data;
};


module.exports = missingRelated;