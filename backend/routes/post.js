import express from 'express';
import checkID from '../middleware/checkID.js';
import checkAuth from '../middleware/checkAuth.js';
import checkBody from '../middleware/checkBody.js';
import checkQuerys from '../middleware/checkQuerys.js';
import * as postController from '../controllers/post.js';

const router = express.Router();

router.get('/', checkQuerys, postController.listPosts);
router.post('/', checkAuth, checkBody, postController.createPost);
router.get('/:id', checkID('posts'), postController.readPost);
router.put(
  '/:id',
  checkAuth,
  checkID('posts'),
  checkBody,
  postController.updatePost,
);
router.delete(
  '/:id',
  checkAuth,
  checkID('posts'),
  checkQuerys,
  postController.deletePost,
);

export default router;
