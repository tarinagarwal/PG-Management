import express from 'express';
import { 
  getBookings, 
  getBooking, 
  createBooking, 
  updateBooking, 
  deleteBooking 
} from '../controllers/bookings.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router
  .route('/')
  .get(getBookings)
  .post(authorize('finder'), createBooking);

router
  .route('/:id')
  .get(getBooking)
  .put(updateBooking)
  .delete(deleteBooking);

export default router;