import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Building, Users, Calendar, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    properties: 0,
    bookings: 0,
    pendingBookings: 0
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch bookings
        const bookingsRes = await axios.get('/bookings');
        const bookings = bookingsRes.data.data || [];
        
        // If user is owner or admin, fetch properties
        let properties: any[] = [];
        if (user?.role === 'owner' || user?.role === 'admin') {
          const propertiesRes = await axios.get('/properties');
          properties = propertiesRes.data.data || [];
        }
        
        // Calculate stats
        setStats({
          properties: properties.length,
          bookings: bookings.length,
          pendingBookings: bookings.filter((b: any) => b.status === 'pending').length
        });
        
        // Get recent bookings (last 5)
        setRecentBookings(bookings.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

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
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.name}!
          </p>
        </div>
        {user?.role === 'owner' && (
          <div className="mt-4 sm:mt-0">
            <Link
              to="/dashboard/add-property"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Add New Property
            </Link>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Property Count - Only for owner and admin */}
        {(user?.role === 'owner' || user?.role === 'admin') && (
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Building className="h-6 w-6 text-teal-600" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Properties</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.properties}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to="/dashboard/my-properties" className="font-medium text-teal-600 hover:text-teal-500">
                  View all
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Bookings */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-teal-600" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{stats.bookings}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/dashboard/my-bookings" className="font-medium text-teal-600 hover:text-teal-500">
                View all
              </Link>
            </div>
          </div>
        </div>

        {/* Pending Bookings */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-amber-600" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Bookings</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{stats.pendingBookings}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/dashboard/my-bookings?status=pending" className="font-medium text-teal-600 hover:text-teal-500">
                View pending
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Bookings</h3>
          <Link to="/dashboard/my-bookings" className="text-sm font-medium text-teal-600 hover:text-teal-500 flex items-center">
            View all <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="border-t border-gray-200">
          <div className="overflow-hidden overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  {user?.role !== 'finder' && (
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                  )}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check-in Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.length > 0 ? (
                  recentBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-md object-cover" 
                              src={booking.property.photos[0]} 
                              alt="" 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{booking.property.title}</div>
                            <div className="text-sm text-gray-500">{booking.property.address.city}</div>
                          </div>
                        </div>
                      </td>
                      {user?.role !== 'finder' && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.user.name}</div>
                          <div className="text-sm text-gray-500">{booking.user.email}</div>
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(booking.checkInDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/dashboard/my-bookings/${booking._id}`} className="text-teal-600 hover:text-teal-900">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;