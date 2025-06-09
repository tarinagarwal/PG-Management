import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const MyProperties: React.FC = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/properties');
        const userProperties = response.data.data.filter(
          (property: any) => property.owner._id === user?._id
        );
        setProperties(userProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }

    try {
      await axios.delete(`/properties/${id}`);
      setProperties(properties.filter((property: any) => property._id !== id));
    } catch (error) {
      console.error('Error deleting property:', error);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
        <Link
          to="/dashboard/add-property"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Property
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map((property: any) => (
                <tr key={property._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={property.photos[0]}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{property.title}</div>
                        <div className="text-sm text-gray-500">{property.propertyType} - {property.roomType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.address.city}, {property.address.state}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{property.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">per month</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      property.available
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {property.available ? 'Available' : 'Not Available'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/dashboard/edit-property/${property._id}`}
                        className="text-teal-600 hover:text-teal-900"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProperties;