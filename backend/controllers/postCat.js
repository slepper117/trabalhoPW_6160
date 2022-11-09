import query from '../database/index.js';
import { Error400, Error404 } from '../classes/errors.js';
import paginate from '../functions/paginate.js';

const domain = process.env.DOMAIN;

async function createPostCat(req, res, next) {
  const { name } = req.body;

  try {
    if (!name) throw new Error400('category-name-required', 'Name is required');

    const newPostCat = await query(
      'INSERT INTO crm.post_categories (name) VALUES ($1) RETURNING *',
      [name]
    );

    res.json(newPostCat.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function readPostCat(req, res, next) {
  const { id } = req;

  try {
    const getPostCat = await query(
      `
      SELECT t1.id, t1.name, count(t2.id) 
      FROM crm.post_categories t1 
      LEFT JOIN crm.posts t2 ON t1.id = t2.category 
      WHERE t1.id = $1 
      GROUP BY t1.id`,
      [id]
    );

    res.json(getPostCat.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function updatePostCat(req, res, next) {
  const { id } = req;
  const { name } = req.body;

  try {
    await query('UPDATE crm.post_categories SET name = $1 WHERE id = $2', [
      name,
      id
    ]);

    const updatedPostCat = await query(
      `
      SELECT t1.id, t1.name, count(t2.id) 
      FROM crm.post_categories t1 
      LEFT JOIN crm.posts t2 ON t1.id = t2.category 
      WHERE t1.id = $1 
      GROUP BY t1.id`,
      [id]
    );

    res.json(updatedPostCat.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function deletePostCat(req, res, next) {
  const { id } = req;
  const { force } = req.query;

  try {
    if (id === 1)
      throw new Error400('cannot-delete', 'Default category cannot be deleted');

    const boolForce = force === 'true';

    const getPostCat = await query(
      `
      SELECT t1.id, count(t2.id) 
      FROM crm.post_categories t1 
      LEFT JOIN crm.posts t2 ON t1.id = t2.category 
      WHERE t1.id = $1 
      GROUP BY t1.id`,
      [id]
    );

    const parseCount = parseInt(getPostCat.rows[0].count, 10);

    if (boolForce && parseCount !== 0) {
      await query('UPDATE crm.posts SET category = 1 WHERE category = $1', [
        id
      ]);
      await query('DELETE FROM crm.post_categories WHERE id = $1', [id]);
      res.json(getPostCat.rows[0]);
    } else if (!boolForce && parseCount !== 0) {
      throw new Error400('cannot-delete', `Category as ${parseCount} Posts`);
    } else {
      await query('DELETE FROM crm.post_categories WHERE id = $1', [id]);
      res.json(getPostCat.rows[0]);
    }
  } catch (err) {
    next(err);
  }
}

async function listPostCats(req, res, next) {
  const { page, limit, order, orderby } = req.query;

  try {
    if (orderby === 'date' || orderby === 'title') {
      throw new Error400('oderby-not-suported', 'Orderby not supported');
    }

    const allPostCats = await query(`
      SELECT t1.id, t1.name, count(t2.id) 
      FROM crm.post_categories t1 
      LEFT JOIN crm.posts t2 ON t1.id=t2.category 
      GROUP BY t1.id 
      ORDER BY t1.${orderby || 'id'} ${order || 'ASC'}`);

    if (allPostCats.rowCount === 0)
      throw new Error404(
        'posts-not-found',
        'No posts were found with the given params'
      );

    if (allPostCats.rowCount > limit && page > 0) {
      const postCatsPaginated = paginate(
        allPostCats.rows,
        allPostCats.rowCount,
        page,
        limit
      );

      if (page > postCatsPaginated.lastPage)
        throw new Error404('page-not-found', 'The page indicated not found');

      if (postCatsPaginated.prevPage && postCatsPaginated.nextPage) {
        res.set(
          'Link',
          `<https://${domain}/posts/categories?page=${postCatsPaginated.prevPage}>; rel='prev', 
          <https://${domain}/posts/categories?page=${postCatsPaginated.nextPage}>; rel='next'`
        );
      } else if (!postCatsPaginated.prevPage && postCatsPaginated.nextPage) {
        res.set(
          'Link',
          `<https://${domain}/posts/categories?page=${postCatsPaginated.nextPage}>; rel='next'`
        );
      } else if (postCatsPaginated.prevPage && !postCatsPaginated.nextPage) {
        res.set(
          'Link',
          `<https://${domain}/posts/categories?page=${postCatsPaginated.prevPage}>; rel='prev'`
        );
      }

      res.set('X-BTH-Total', allPostCats.rowCount);
      res.set('X-BTH-TotalPages', postCatsPaginated.lastPage);
      res.json(postCatsPaginated.pageData);
    } else {
      res.set('X-BTH-Total', allPostCats.rowCount);
      res.set('X-BTH-TotalPages', 1);
      res.json(allPostCats.rows);
    }
  } catch (err) {
    next(err);
  }
}

export {
  createPostCat,
  readPostCat,
  updatePostCat,
  deletePostCat,
  listPostCats
};
