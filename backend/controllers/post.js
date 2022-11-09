import query from '../database/index.js';
import { Error400, Error404 } from '../classes/errors.js';
import paginate from '../functions/paginate.js';
import { arrayToString } from '../functions/validation.js';

const domain = process.env.DOMAIN;
const availableProps = [
  'category',
  'date',
  'title',
  'excerpt',
  'content',
  'status',
  'featured'
];

async function createPost(req, res, next) {
  const author = req.user;
  const { body } = req;

  try {
    if (!body.title || !body.excerpt || !body.content) {
      throw new Error400(
        'mandatory-props-are-missing',
        'Check if the mandatory propresties are missing or empty'
      );
    }

    const arrayKeys = Object.keys(body);
    const arrayValues = Object.values(body);

    arrayKeys.forEach((key) => {
      if (!availableProps.includes(key))
        throw new Error400(
          `prop-${key}-not-supported`,
          `The property '${key}' isnt supported in request body by this operation`
        );
    });

    const strArrayKeys = arrayKeys.toString();
    const strArrayValues = arrayToString(arrayValues);

    const newPost = await query(
      `INSERT INTO crm.posts (author,${strArrayKeys}) VALUES (${
        author || 1
      },${strArrayValues}) RETURNING *`
    );

    res.json(newPost.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function readPost(req, res, next) {
  const { id } = req;

  try {
    const getPost = await query('SELECT * FROM crm.posts WHERE id = $1', [id]);
    res.json(getPost.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function updatePost(req, res, next) {
  const { id, body } = req;

  try {
    const arrayKeys = Object.keys(body);
    const arrayValues = Object.values(body);

    arrayKeys.forEach((key) => {
      if (!availableProps.includes(key))
        throw new Error400(
          `prop-${key}-not-supported`,
          `The property '${key}' isnt supported in request body by this operation`
        );
    });

    const strArrayKeys = arrayKeys.toString();
    const strArrayValues = arrayToString(arrayValues);

    const editPost = await query(
      `UPDATE crm.posts SET (${strArrayKeys}) = (${strArrayValues}) WHERE id = ${id} RETURNING *`
    );

    res.json(editPost.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function deletePost(req, res, next) {
  const { id } = req;
  const { force } = req.query;

  try {
    let getPost = await query('SELECT * FROM crm.posts WHERE id = $1', [id]);
    const statusPost = getPost.rows[0].status;

    if (!force && statusPost !== 'deleted') {
      getPost = await query(
        "UPDATE crm.posts SET status = 'deleted' WHERE id = $1 RETURNING *",
        [id]
      );
    } else {
      await query('DELETE FROM crm.posts WHERE id = $1', [id]);
    }

    res.json(getPost.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function listPosts(req, res, next) {
  const { page, limit, authors, order, orderby, status, featured, categories } =
    req.query;
  let authorQuery = '';
  let categoriesQuery = '';
  let featuredQuery = '';
  let statusQuery = '';

  try {
    if (authors) authorQuery = `AND author IN (${authors})`;
    if (categories) categoriesQuery = `AND category IN (${categories})`;
    if (featured) featuredQuery = `AND featured=${featured}`;

    if (orderby === 'name') {
      throw new Error400('oderby-not-suported', 'Orderby not supported');
    }

    if (status) {
      statusQuery = arrayToString(status);
    } else {
      statusQuery = "'publish'";
    }

    const allPosts = await query(`
      SELECT * FROM crm.posts 
      WHERE status IN (${statusQuery}) ${authorQuery} ${categoriesQuery} ${featuredQuery}
      ORDER BY ${orderby || 'date'} ${order || 'DESC'}`);

    if (allPosts.rowCount === 0)
      throw new Error404(
        'posts-not-found',
        'No posts were found with the given params'
      );

    if (allPosts.rowCount > limit && page > 0) {
      const postsPaginated = paginate(
        allPosts.rows,
        allPosts.rowCount,
        page,
        limit
      );

      if (page > postsPaginated.lastPage)
        throw new Error404('page-not-found', 'The page indicated not found');

      if (postsPaginated.prevPage && postsPaginated.nextPage) {
        res.set(
          'Link',
          `<https://${domain}/posts?page=${postsPaginated.prevPage}>; rel='prev', 
          <https://${domain}/posts?page=${postsPaginated.nextPage}>; rel='next'`
        );
      } else if (!postsPaginated.prevPage && postsPaginated.nextPage) {
        res.set(
          'Link',
          `<https://${domain}/posts?page=${postsPaginated.nextPage}>; rel='next'`
        );
      } else if (postsPaginated.prevPage && !postsPaginated.nextPage) {
        res.set(
          'Link',
          `<https://${domain}/posts?page=${postsPaginated.prevPage}>; rel='prev'`
        );
      }

      res.set('X-BTH-Total', allPosts.rowCount);
      res.set('X-BTH-TotalPages', postsPaginated.lastPage);
      res.json(postsPaginated.pageData);
    } else {
      res.set('X-BTH-Total', allPosts.rowCount);
      res.set('X-BTH-TotalPages', 1);
      res.json(allPosts.rows);
    }
  } catch (err) {
    next(err);
  }
}

export { createPost, readPost, updatePost, deletePost, listPosts };
