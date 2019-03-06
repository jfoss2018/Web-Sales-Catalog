
function filterContent(contents, filter, search, featured, ltoh, htol) {
  let wipContents = filterViewable(contents);
  if ((!search && !filter) || (search === '' && !filter)) {
    return wipContents;
  }
  if (search && search !== '') {
    wipContents = filterName(wipContents, search);
  }
  if (filter) {
    if (featured) {
      wipContents = filterFeatured(wipContents);
    }
  }
  return wipContents;
}

function filterViewable(c) {
  const newContents = c.filter(function (item) {
    return item.viewable === true;
  });
  return newContents;
}

function filterName(c, s) {
  const newContents = c.filter(function (item) {
    return item.name.toLowerCase().includes(s.toLowerCase());
  });
  return newContents;
}

function filterFeatured(c) {
  const newContents = c.filter(function (item) {
    return item.featured === true;
  });
  return newContents;
}

module.exports = { filterContent };
