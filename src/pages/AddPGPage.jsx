import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Plus, X } from 'lucide-react';
import { pgAPI } from '../services/api';

export default function AddPGPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    distance: '',
    price: '',
    sharingType: 'Single',
    gender: 'Male',
    available: true,
    description: '',
    images: [''],
    amenities: [],
    rules: [''],
    contactInfo: {
      ownerName: '',
      phone: '',
      email: ''
    },
    facilities: {
      roomSize: '',
      bedType: '',
      attached: false,
      balcony: false,
      furnishing: ''
    },
    timing: {
      gateClosing: '',
      visitingHours: ''
    }
  });

  const availableAmenities = ['WiFi', 'Meals', 'AC', 'Parking', 'Laundry', 'Security', 'Gym', 'TV', 'Power Backup'];
  const sharingTypes = ['Single', 'Double Sharing', 'Triple Sharing', 'Four Sharing'];
  const genders = ['Male', 'Female', 'Co-living'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImageField = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleRuleChange = (index, value) => {
    const newRules = [...formData.rules];
    newRules[index] = value;
    setFormData(prev => ({ ...prev, rules: newRules }));
  };

  const addRuleField = () => {
    setFormData(prev => ({ ...prev, rules: [...prev.rules, ''] }));
  };

  const removeRuleField = (index) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Clean up data
      const cleanData = {
        ...formData,
        price: parseFloat(formData.price),
        images: formData.images.filter(img => img.trim() !== ''),
        rules: formData.rules.filter(rule => rule.trim() !== ''),
        rating: 0,
        reviews: []
      };

      await pgAPI.create(cleanData);
      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add PG. Please try again.');
      console.error('Error adding PG:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </button>
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-rose-600 p-2 rounded-xl shadow-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-display font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                  PG Finder
                </h1>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Add New PG</h1>
            <p className="text-gray-600">Fill in the details to list a new PG accommodation</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              PG added successfully! Redirecting to home page...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    PG Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                    placeholder="e.g., Sunrise PG"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                    placeholder="e.g., Sector 18, Near Main Gate"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                    placeholder="e.g., 123 Main Road, Sector 18, City"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Distance from College *
                  </label>
                  <input
                    type="text"
                    name="distance"
                    value={formData.distance}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                    placeholder="e.g., 0.5 km"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Monthly Rent (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                    placeholder="e.g., 8500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Sharing Type *
                  </label>
                  <select
                    name="sharingType"
                    value={formData.sharingType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                  >
                    {sharingTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Gender Preference *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                  >
                    {genders.map(gender => (
                      <option key={gender} value={gender}>{gender}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                    placeholder="Describe your PG, its features, and what makes it special..."
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label className="text-sm font-semibold text-gray-900">
                    Currently Available
                  </label>
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Images</h2>
              <div className="space-y-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                      placeholder="Image URL (e.g., https://example.com/image.jpg)"
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                >
                  <Plus className="h-5 w-5" />
                  Add Another Image
                </button>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableAmenities.map(amenity => (
                  <label
                    key={amenity}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Room Facilities */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Room Facilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Room Size
                  </label>
                  <input
                    type="text"
                    value={formData.facilities.roomSize}
                    onChange={(e) => handleNestedChange('facilities', 'roomSize', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                    placeholder="e.g., 12x10 ft"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Bed Type
                  </label>
                  <input
                    type="text"
                    value={formData.facilities.bedType}
                    onChange={(e) => handleNestedChange('facilities', 'bedType', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                    placeholder="e.g., Single Bed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Furnishing
                  </label>
                  <input
                    type="text"
                    value={formData.facilities.furnishing}
                    onChange={(e) => handleNestedChange('facilities', 'furnishing', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                    placeholder="e.g., Semi-Furnished"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.facilities.attached}
                      onChange={(e) => handleNestedChange('facilities', 'attached', e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">Attached Bathroom</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.facilities.balcony}
                      onChange={(e) => handleNestedChange('facilities', 'balcony', e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">Balcony</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    value={formData.contactInfo.ownerName}
                    onChange={(e) => handleNestedChange('contactInfo', 'ownerName', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                    placeholder="e.g., Rajesh Kumar"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.contactInfo.phone}
                    onChange={(e) => handleNestedChange('contactInfo', 'phone', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                    placeholder="e.g., +91 98765 43210"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.contactInfo.email}
                    onChange={(e) => handleNestedChange('contactInfo', 'email', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                    placeholder="e.g., contact@pg.com"
                  />
                </div>
              </div>
            </div>

            {/* Timings */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Timings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Gate Closing Time
                  </label>
                  <input
                    type="text"
                    value={formData.timing.gateClosing}
                    onChange={(e) => handleNestedChange('timing', 'gateClosing', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                    placeholder="e.g., 11:00 PM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Visiting Hours
                  </label>
                  <input
                    type="text"
                    value={formData.timing.visitingHours}
                    onChange={(e) => handleNestedChange('timing', 'visitingHours', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                    placeholder="e.g., 10 AM - 8 PM"
                  />
                </div>
              </div>
            </div>

            {/* House Rules */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">House Rules</h2>
              <div className="space-y-3">
                {formData.rules.map((rule, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={rule}
                      onChange={(e) => handleRuleChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                      placeholder="e.g., No smoking"
                    />
                    {formData.rules.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRuleField(index)}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addRuleField}
                  className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                >
                  <Plus className="h-5 w-5" />
                  Add Another Rule
                </button>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding PG...' : 'Add PG'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
