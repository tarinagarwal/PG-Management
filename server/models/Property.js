import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Please add a street address']
    },
    city: {
      type: String,
      required: [true, 'Please add a city']
    },
    state: {
      type: String,
      required: [true, 'Please add a state']
    },
    zipCode: {
      type: String,
      required: [true, 'Please add a zip code']
    },
    country: {
      type: String,
      required: [true, 'Please add a country'],
      default: 'India'
    }
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  features: {
    type: [String],
    default: []
  },
  propertyType: {
    type: String,
    required: [true, 'Please add a property type'],
    enum: ['PG', 'Hostel', 'Apartment', 'Room', 'House']
  },
  roomType: {
    type: String,
    enum: ['Single', 'Double', 'Triple', '1BHK', '2BHK', '3BHK', 'Other'],
    required: [true, 'Please add a room type']
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Unisex'],
    required: [true, 'Please specify gender preference']
  },
  photos: {
    type: [String],
    default: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg']
  },
  amenities: {
    type: [String],
    default: []
  },
  rules: {
    type: [String],
    default: []
  },
  available: {
    type: Boolean,
    default: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for bookings
PropertySchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'property',
  justOne: false
});

const Property = mongoose.model('Property', PropertySchema);

export default Property;