import express from 'express';
import checkID from '../middleware/checkID.js';
import checkAuth from '../middleware/checkAuth.js';
import checkQuerys from '../middleware/checkQuerys.js';
import * as postCatController from '../controllers/postCat.js';

const router = express.Router();

router.get('/', checkQuerys, postCatController.listPostCats);
router.post('/', checkAuth, postCatController.createPostCat);
router.get('/:id', checkID('post_categories'), postCatController.readPostCat);
router.put(
  '/:id',
  checkAuth,
  checkID('post_categories'),
  postCatController.updatePostCat,
);
router.delete(
  '/:id',
  checkAuth,
  checkID('post_categories'),
  checkQuerys,
  postCatController.deletePostCat,
);

export default router;
