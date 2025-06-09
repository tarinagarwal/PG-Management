import express from 'express';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/users.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router
  .route('/')
  .get(authorize('admin'), getUsers);

router
  .route('/:id')
  .get(authorize('admin'), getUser)
  .put(updateUser)
  .delete(authorize('admin'), deleteUser);

export default router;