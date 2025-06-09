import Booking from '../models/Booking.js';
import Property from '../models/Property.js';

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
export const getBookings = async (req, res) => {
  try {
    let query;
    
    // If user is finder, show only their bookings
    if (req.user.role === 'finder') {
      query = Booking.find({ user: req.user.id });
    } 
    // If user is owner, show bookings for their properties
    else if (req.user.role === 'owner') {
      // First get all properties owned by this user
      const properties = await Property.find({ owner: req.user.id });
      const propertyIds = properties.map(property => property._id);
      
      // Then find bookings for these properties
      query = Booking.find({ property: { $in: propertyIds } });
    } 
    // If admin, show all bookings
    else {
      query = Booking.find();
    }
    
    // Add population
    query = query.populate({
      path: 'property',
      select: 'title address price photos'
    }).populate({
      path: 'user',
      select: 'name email phone'
    });
    
    // Execute query
    const bookings = await query;
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate({
      path: 'property',
      select: 'title address price photos'
    }).populate({
      path: 'user',
      select: 'name email phone'
    });
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Make sure user is booking owner, property owner, or admin
    if (
      booking.user._id.toString() !== req.user.id && 
      req.user.role !== 'admin'
    ) {
      // Check if user is the property owner
      const property = await Property.findById(booking.property);
      if (property.owner.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to view this booking'
        });
      }
    }
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private/Finder
export const createBooking = async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;
    
    // Check if property exists
    const property = await Property.findById(req.body.property);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
    // Check if property is available
    if (!property.available) {
      return res.status(400).json({
        success: false,
        message: 'Property is not available'
      });
    }
    
    // Create booking
    const booking = await Booking.create(req.body);
    
    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private/Owner or Admin
export const updateBooking = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // If user is finder, they can only update their message
    if (req.user.role === 'finder') {
      // Make sure finder is booking owner
      if (booking.user.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this booking'
        });
      }
      
      // Only allow updating message
      const allowedUpdates = { message: req.body.message };
      
      booking = await Booking.findByIdAndUpdate(
        req.params.id,
        allowedUpdates,
        { new: true, runValidators: true }
      );
    } 
    // Owner or admin can update status
    else {
      // If owner, make sure they own the property
      if (req.user.role === 'owner') {
        const property = await Property.findById(booking.property);
        
        if (property.owner.toString() !== req.user.id) {
          return res.status(403).json({
            success: false,
            message: 'Not authorized to update this booking'
          });
        }
      }
      
      booking = await Booking.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
    }
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Make sure user is booking owner or admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this booking'
      });
    }
    
    await booking.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};