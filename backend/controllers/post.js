import query from '../database/index.js';
import paginate from '../functions/paginate.js';
import { arrayToString } from '../functions/validation.js';
import { Error400, Error404 } from '../classes/errors.js';

const domain = process.env.DOMAIN;
const availableProps = [
  'category',
  'date',
  'title',
  'excerpt',
  'content',
  'status',
  'featured',
];

async function createPost(req, res, next) {
  const author = req.user;
  const { body } = req;

  try {
    // Check mandatory properties
    if (!body.title || !body.excerpt || !body.content) {
      throw new Error400(
        'mandatory-props-are-missing',
        'Check if the mandatory propresties are missing or empty',
      );
    }

    // Separates keys and values from body
    const arrayKeys = Object.keys(body);
    const arrayValues = Object.values(body);

    // Check if keys are valid
    arrayKeys.forEach((key) => {
      if (!availableProps.includes(key)) {
        throw new Error400(
          `prop-${key}-not-supported`,
          `The property '${key}' isnt supported in request body by this operation`,
        );
      }
    });

    // Creates strings of values
    const strArrayKeys = arrayKeys.toString();
    const strArrayValues = arrayToString(arrayValues);

    // Inserts new post on database
    const newPost = await query(
      `INSERT INTO crm.posts (author,${strArrayKeys}) VALUES (${
        author || 1
      },${strArrayValues}) RETURNING *`,
    );

    // Sends the result
    res.json(newPost.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function readPost(req, res, next) {
  const { id } = req;

  try {
    // Queries database to retrieve object
    const getPost = await query('SELECT * FROM crm.posts WHERE id = $1', [id]);

    // Sends the result
    res.json(getPost.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function updatePost(req, res, next) {
  const { id, body } = req;

  try {
    // Separates keys and values from body
    const arrayKeys = Object.keys(body);
    const arrayValues = Object.values(body);

    // Check if keys are valid
    arrayKeys.forEach((key) => {
      if (!availableProps.includes(key)) {
        throw new Error400(
          `prop-${key}-not-supported`,
          `The property '${key}' isnt supported in request body by this operation`,
        );
      }
    });

    // Creates strings of values
    const strArrayKeys = arrayKeys.toString();
    const strArrayValues = arrayToString(arrayValues);

    // Updates post on database
    const editPost = await query(
      `UPDATE crm.posts SET (${strArrayKeys}) = (${strArrayValues}) WHERE id = ${id} RETURNING *`,
    );

    // Sends the result
    res.json(editPost.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function deletePost(req, res, next) {
  const { id } = req;
  const { force } = req.query;

  try {
    // Queries database to retrive object
    let getPost = await query('SELECT * FROM crm.posts WHERE id = $1', [id]);

    // Get post status
    const statusPost = getPost.rows[0].status;

    if (!force && statusPost !== 'deleted') {
      // Set post status deleted
      getPost = await query(
        "UPDATE crm.posts SET status = 'deleted' WHERE id = $1 RETURNING *",
        [id],
      );
    } else {
      // Deletes post
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
    // Constructs query parts
    if (authors) authorQuery = `AND author IN (${authors})`;
    if (categories) categoriesQuery = `AND category IN (${categories})`;
    if (featured) featuredQuery = `AND featured=${featured}`;

    // Check if orderby is valid
    if (orderby === 'name') {
      throw new Error400('oderby-not-suported', 'Orderby not supported');
    }

    // Converts multiple status to array
    if (status) {
      statusQuery = arrayToString(status);
    } else {
      statusQuery = "'publish'";
    }

    // Constructs query
    const allPosts = await query(`
      SELECT * FROM crm.posts 
      WHERE status IN (${statusQuery}) ${authorQuery} ${categoriesQuery} ${featuredQuery}
      ORDER BY ${orderby || 'date'} ${order || 'DESC'}`);

    // Validates if exists
    if (allPosts.rowCount === 0) {
      throw new Error404(
        'posts-not-found',
        'No posts were found with the given params',
      );
    }

    // Paginate results
    if (allPosts.rowCount > limit && page > 0) {
      const postsPaginated = paginate(
        allPosts.rows,
        allPosts.rowCount,
        page,
        limit,
      );

      // Validates page number
      if (page > postsPaginated.lastPage)
        throw new Error404('page-not-found', 'The page indicated not found');

      // Set's Link Header
      if (postsPaginated.prevPage && postsPaginated.nextPage) {
        res.set(
          'Link',
          `<https://${domain}/posts?page=${postsPaginated.prevPage}>; rel='prev', <https://${domain}/posts?page=${postsPaginated.nextPage}>; rel='next'`,
        );
      } else if (!postsPaginated.prevPage && postsPaginated.nextPage) {
        res.set(
          'Link',
          `<https://${domain}/posts?page=${postsPaginated.nextPage}>; rel='next'`,
        );
      } else if (postsPaginated.prevPage && !postsPaginated.nextPage) {
        res.set(
          'Link',
          `<https://${domain}/posts?page=${postsPaginated.prevPage}>; rel='prev'`,
        );
      }

      // Returns other headers and results
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
