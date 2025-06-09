import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  checkInDate: {
    type: Date,
    required: [true, 'Please add a check-in date']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'canceled'],
    default: 'pending'
  },
  message: {
    type: String,
    maxlength: [500, 'Message cannot be more than 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;