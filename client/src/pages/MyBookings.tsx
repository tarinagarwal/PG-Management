import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Calendar, MapPin, User, Clock, CheckCircle, XCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/bookings');
        setBookings(response.data.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusUpdate = async (bookingId: string, status: string) => {
    try {
      await axios.put(`/bookings/${bookingId}`, { status });
      setBookings(
        bookings.map((booking: any) =>
          booking._id === bookingId ? { ...booking, status } : booking
        )
      );
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'canceled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>

      <div className="space-y-6">
        {bookings.map((booking: any) => (
          <div
            key={booking._id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <div className="flex items-start space-x-4">
                    <img
                      src={booking.property.photos[0]}
                      alt={booking.property.title}
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {booking.property.title}
                      </h2>
                      <p className="flex items-center text-gray-600 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {booking.property.address.city}, {booking.property.address.state}
                      </p>
                      <p className="text-gray-600 mt-1">
                        ₹{booking.property.price.toLocaleString()}/month
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 md:text-right">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                  <p className="flex items-center justify-end mt-2 text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        {user?.role === 'finder' ? 'Your message' : `Message from ${booking.user.name}`}
                      </h3>
                      <p className="text-sm text-gray-500">
                        <Clock className="h-4 w-4 inline mr-1" />
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{booking.message}</p>
                  </div>
                </div>
              </div>

              {user?.role === 'owner' && booking.status === 'pending' && (
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(booking._id, 'approved')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't made any bookings yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;