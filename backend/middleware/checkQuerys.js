import {
  toInt,
  isInArray,
  toBoolean,
  isSomeArray,
  toArray,
  toArrayNum,
  idExist,
} from '../functions/validation.js';

async function checkParams(req, res, next) {
  const {
    page,
    limit,
    authors,
    order,
    orderby,
    status,
    featured,
    categories,
    force,
  } = req.query;

  const queryParams = {};
  const arrayOrder = ['asc', 'desc'];
  const arrayOrderby = ['date', 'id', 'title', 'name'];
  const arrayStatus = ['publish', 'future', 'draft'];

  try {
    /**
     * Check if Page number is number
     */
    if (page) {
      queryParams.page = toInt('page', page);
    } else {
      queryParams.page = 1;
    }

    /**
     * Check if Limit (object number) is number
     */
    if (limit) {
      queryParams.limit = toInt('limit', limit);
    } else {
      queryParams.limit = 10;
    }

    /**
     * Check if Order is valid
     */
    if (order) {
      isInArray('order', order, arrayOrder);
      queryParams.order = order;
    }

    /**
     * Check if Orderby is valid
     */
    if (orderby) {
      isInArray('order', orderby, arrayOrderby);
      queryParams.orderby = orderby;
    }

    /**
     * Check if Authores are valid and exists
     */
    if (authors) {
      const array = toArrayNum('authors', authors);
      idExist('authores', array, 'users');
      queryParams.authors = array;
    }

    /**
     * Check if Categories are valid and exists
     */
    if (categories) {
      const array = toArrayNum('categories', categories);
      idExist('categories', array, 'post_categories');
      queryParams.categories = array;
    }

    /**
     * Check if Status is valid
     */
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
