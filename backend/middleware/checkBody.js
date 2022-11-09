import query from '../database/index.js';
import { isEmpty } from '../functions/validation.js';
import { Error400, Error404 } from '../classes/errors.js';

async function checkBody(req, _res, next) {
  const { category, date, title, excerpt, content, status, featured } =
    req.body;

  const body = {};
  const boolArray = ['true', 'false'];
  const statusArray = ['publish', 'draft'];
  const dateNow = new Date().toISOString();

  let parseDate = '';

  try {
    if (category) {
      const parseCat = parseInt(category, 10);
      if (!Number.isNaN(parseCat)) {
        const queryCat = await query('SELECT id FROM crm.post_categories');
        const map = queryCat.rows.map(({ id }) => id);
        if (map.includes(parseCat)) {
          body.category = parseCat;
        } else {
          throw new Error404(
            'category-dosent-exist',
            'Category provided not exist'
          );
        }
      } else {
        throw new Error400(
          'category-not-integer',
          'The category provided is not a integer'
        );
      }
    } else {
      body.category = 1;
    }

    if (date) {
      const parsDate = Date.parse(date);
      if (Number.isNaN(parsDate)) throw new Error400('teste', 'tteste');
      parseDate = new Date(date).toISOString();
    }

    if (status) {
      if (!statusArray.includes(status)) throw new Error400('teste', 'tteste');
    }

    if (date && status) {
      if (status === 'publish') {
        if (parseDate > Date.now()) {
          body.status = 'future';
          body.date = parseDate;
        } else {
          body.status = 'publish';
          body.date = parseDate;
        }
      } else {
        body.status = 'draft';
        body.date = parseDate;
      }
    } else if (date && !status) {
      if (parseDate > Date.now()) {
        body.status = 'future';
        body.date = parseDate;
      } else {
        body.status = 'publish';
        body.date = parseDate;
      }
    } else if (!date && status) {
      if (status === 'publish') {
        body.status = 'publish';
        body.date = dateNow;
      } else {
        body.status = 'draft';
        body.date = dateNow;
      }
    } else {
      body.status = 'publish';
      body.date = dateNow;
    }

    if (featured) {
      if (boolArray.includes(featured)) {
        body.featured = featured;
      } else {
        throw new Error400(
          'featured-not-bool',
          'The parameter featured is not boolean'
        );
      }
    } else {
      body.featured = false;
    }

    if (title) {
      isEmpty('title', title);
      body.title = title;
    }

    if (excerpt) {
      isEmpty('excerpt', excerpt);
      body.excerpt = excerpt;
    }

    if (content) {
      isEmpty('content', content);
      body.content = content;
    }

    req.body = body;
    next();
  } catch (err) {
    next(err);
  }
}

export default checkBody;
