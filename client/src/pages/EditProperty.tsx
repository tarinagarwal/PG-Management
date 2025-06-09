import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const EditProperty: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    },
    price: '',
    propertyType: 'PG',
    roomType: 'Single',
    gender: 'Male',
    photos: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'],
    amenities: [],
    rules: [],
    features: [],
    available: true
  });

  const [newAmenity, setNewAmenity] = useState('');
  const [newRule, setNewRule] = useState('');
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/properties/${id}`);
        setFormData(response.data.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddItem = (type: 'amenities' | 'rules' | 'features', value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], value.trim()]
      }));
      if (type === 'amenities') setNewAmenity('');
      if (type === 'rules') setNewRule('');
      if (type === 'features') setNewFeature('');
    }
  };

  const handleRemoveItem = (type: 'amenities' | 'rules' | 'features', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put(`/properties/${id}`, {
        ...formData,
        price: Number(formData.price)
      });
      
      navigate('/dashboard/my-properties');
    } catch (error) {
      console.error('Error updating property:', error);
    } finally {
      setSaving(false);
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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Property</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Property Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
                  Property Type
                </label>
                <select
                  name="propertyType"
                  id="propertyType"
                  required
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="PG">PG</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Room">Room</option>
                  <option value="House">House</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">
                  Room Type
                </label>
                <select
                  name="roomType"
                  id="roomType"
                  required
                  value={formData.roomType}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Triple">Triple</option>
                  <option value="1BHK">1BHK</option>
                  <option value="2BHK">2BHK</option>
                  <option value="3BHK">3BHK</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender Preference
                </label>
                <select
                  name="gender"
                  id="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Monthly Rent (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div>
                <label htmlFor="available" className="block text-sm font-medium text-gray-700">
                  Availability
                </label>
                <select
                  name="available"
                  id="available"
                  value={formData.available.toString()}
                  onChange={(e) => setFormData(prev => ({ ...prev, available: e.target.value === 'true' }))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Address</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="address.street" className="block text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                type="text"
                name="address.street"
                id="address.street"
                required
                value={formData.address.street}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="address.city"
                  id="address.city"
                  required
                  value={formData.address.city}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div>
                <label htmlFor="address.state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="address.state"
                  id="address.state"
                  required
                  value={formData.address.state}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="address.zipCode" className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="address.zipCode"
                  id="address.zipCode"
                  required
                  value={formData.address.zipCode}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div>
                <label htmlFor="address.country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="address.country"
                  id="address.country"
                  disabled
                  value={formData.address.country}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Details</h2>
          
          <div className="space-y-6">
            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  placeholder="Add amenity"
                  className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddItem('amenities', newAmenity)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800"
                  >
                    {amenity}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('amenities', index)}
                      className="ml-2 inline-flex items-center"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            
            {/* Rules */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                House Rules
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newRule}
                  onChange={(e) => setNewRule(e.target.value)}
                  placeholder="Add rule"
                  className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddItem('rules', newRule)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.rules.map((rule, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800"
                  >
                    {rule}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('rules', index)}
                      className="ml-2 inline-flex items-center"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            
            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Features
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add feature"
                  className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddItem('features', newFeature)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('features', index)}
                      className="ml-2 inline-flex items-center"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard/my-properties')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-teal-300"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProperty;