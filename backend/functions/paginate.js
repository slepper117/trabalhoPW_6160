/**
 * Função para Paginar
 * @param {array} sourceList - Array de Objetos
 * @param {integer} sourceCount - Contagem de Objetos
 * @param {integer} page - Numero da Pagina
 * @param {integer} limit - Limite da Pagina
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
    lastPage
  };
}

export default paginate;
