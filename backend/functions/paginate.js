/**
 * Paginate Function
 * @param {array} sourceList - Array of objects
 * @param {integer} sourceCount - Object's count
 * @param {integer} page - Page number
 * @param {integer} limit - Object's limit
 * @returns
 */
function paginate(sourceList, sourceCount, page, limit) {
  const lastPage = Math.floor(sourceCount / limit + 1);
  const sliceBegin = page * limit - limit;
  const sliceEnd = sliceBegin + limit;
  const pageList = sourceList.slice(sliceBegin, sliceEnd);
  return {
    pageData: pageList,
    nextPage: page < lastPage ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
    lastPage,
  };
}

export default paginate;
