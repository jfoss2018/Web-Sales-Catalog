
function paginate(contents, pageNum, itemsPerPage) {
  let newContents = contents;
  let btnContents = [];
  const pages = Math.ceil(contents.length / itemsPerPage);
  const lastItem = contents.length;
  const start = pageNum * itemsPerPage - itemsPerPage;
  const end = pageNum * itemsPerPage;
  if (parseInt(pageNum) === parseInt(pages)) {
    newContents = newContents.slice(start, lastItem);
  } else {
    newContents = newContents.slice(start, end);
  }
  if (pages < 10) {
    btnContents = pageLoop(btnContents, 1, pages, pageNum);
  } else {
    if (pageNum > 4 && pageNum < (pages - 3)) {
      btnContents = pageLoop(btnContents, 1, 1, pageNum);
      btnContents = blank(btnContents);
      btnContents = pageLoop(btnContents, (parseInt(pageNum) - 2), (parseInt(pageNum) + 2), pageNum);
      btnContents = blank(btnContents);
      btnContents = pageLoop(btnContents, pages, pages, pageNum);
    } else if (pageNum <= 4) {
      btnContents = pageLoop(btnContents, 1, 6, pageNum);
      btnContents = blank(btnContents);
      btnContents = pageLoop(btnContents, pages, pages, pageNum);
    } else if (pageNum >= (pages - 3)) {
      btnContents = pageLoop(btnContents, 1, 1, pageNum);
      btnContents = blank(btnContents);
      btnContents = pageLoop(btnContents, (pages - 5), pages, pageNum);
    }
  }
  return {
    contents: newContents,
    btnArr: btnContents
  };
}

function pageLoop(btnContArr, start, end, pageNum) {
  const newArr = btnContArr;
  for (let i = start; i <= end; i += 1) {
    if (i === pageNum) {
      newArr.push({
        className: `page-btn-active${(i > 9) ? ' btn-wide' : ''}`,
        contents: `${i}`
      });
    } else {
      newArr.push({
        className: `page-btn-nonactive${(i > 9) ? ' btn-wide' : ''}`,
        contents: `${i}`
      });
    }
  }
  return newArr;
}

function blank(btnContArr) {
  const newArr = btnContArr;
    newArr.push({
      className: 'page-btn-blank',
      contents: '...'
    });
  return newArr;
}

module.exports = { paginate }
