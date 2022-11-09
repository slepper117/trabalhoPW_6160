import {
  toInt,
  isInArray,
  toBoolean,
  isSomeArray,
  toArray,
  toArrayNum,
  idExist
} from '../functions/validation.js';

async function checkParams(req, _res, next) {
  const {
    page,
    limit,
    authors,
    order,
    orderby,
    status,
    featured,
    categories,
    force
  } = req.query;

  const queryParams = {};
  const arrayOrder = ['asc', 'desc'];
  const arrayOrderby = ['date', 'id', 'title', 'name'];
  const arrayStatus = ['publish', 'future', 'draft'];

  try {
    // Valida o Nº de Páginas
    if (page) {
      queryParams.page = toInt('page', page);
    } else {
      queryParams.page = 1;
    }

    // Valida o limite de objetos
    if (limit) {
      queryParams.limit = toInt('limit', limit);
    } else {
      queryParams.limit = 10;
    }

    // Valida a ordenação
    if (order) {
      isInArray('order', order, arrayOrder);
      queryParams.order = order;
    }

    // Valida o atributo pelo qual é ordenado
    if (orderby) {
      isInArray('order', orderby, arrayOrderby);
      queryParams.orderby = orderby;
    }

    // Valida o Autores
    if (authors) {
      const array = toArrayNum('authors', authors);
      idExist('authores', array, 'users');
      queryParams.authors = array;
    }

    // Valida as Categorias
    if (categories) {
      const array = toArrayNum('categories', categories);
      idExist('categories', array, 'post_categories');
      queryParams.categories = array;
    }

    // Valida o Estado
    if (status) {
      const array = toArray('status', status);
      isSomeArray('status', array, arrayStatus);
      queryParams.status = array;
    }

    /**
     * Check if Featured is Boolean
     */
    if (featured) {
      queryParams.featured = toBoolean('featured', featured);
    }

    /**
     * Check if Force is Boolean
     */
    if (force) {
      queryParams.force = toBoolean('force', force);
    } else {
      queryParams.force = false;
    }

    req.query = queryParams;
    next();
  } catch (err) {
    next(err);
  }
}

export default checkParams;
