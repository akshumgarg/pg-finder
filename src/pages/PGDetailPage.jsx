import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Users, Star, Wifi, Utensils, Car, Wind,
  Shield, Phone, Mail, Clock, Home, Check, X as XIcon,
  Calendar, DoorOpen, Bed, Maximize, Edit, Trash2
} from 'lucide-react';
import { pgAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ReviewSection from '../components/ReviewSection';

export default function PGDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPGDetails();
  }, [id]);

  const fetchPGDetails = async () => {
    try {
      setLoading(true);
      const response = await pgAPI.getById(id);
      setPg(response.data.data);
    } catch (error) {
      console.error('Error fetching PG details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePG = async () => {
    setDeleting(true);
    try {
      await pgAPI.delete(id);
      navigate('/', { 
        state: { message: 'PG deleted successfully' }
      });
    } catch (error) {
      alert('Failed to delete PG. Please try again.');
      console.error('Error deleting PG:', error);
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const amenityIcons = {
    'WiFi': <Wifi className="h-5 w-5" />,
    'Meals': <Utensils className="h-5 w-5" />,
    'AC': <Wind className="h-5 w-5" />,
    'Parking': <Car className="h-5 w-5" />,
    'Laundry': <Shield className="h-5 w-5" />,
    'Security': <Shield className="h-5 w-5" />,
    'Gym': <Shield className="h-5 w-5" />,
    'TV': <Shield className="h-5 w-5" />,
    'Power Backup': <Shield className="h-5 w-5" />,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-600"></div>
      </div>
    );
  }

  if (!pg) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">PG Not Found</h2>
          <Link to="/" className="text-orange-600 hover:text-orange-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-96 bg-gray-200">
            <img
              src={pg.images && pg.images.length > 0 ? pg.images[activeImage] : 'https://via.placeholder.com/1200x600'}
              alt={pg.name}
              className="w-full h-full object-cover"
            />
            {pg.available && (
              <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                Available Now
              </div>
            )}
          </div>
          {pg.images && pg.images.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto">
              {pg.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === index ? 'border-orange-500 scale-105' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Basic Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
                    {pg.name}
                  </h1>
                  <div className="flex items-center gap-3 text-gray-600 mb-3">
                    <MapPin className="h-5 w-5 text-orange-500" />
                    <span className="text-lg">{pg.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                      {pg.gender}
                    </span>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {pg.distance} from college
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-orange-600">
                    ₹{pg.price?.toLocaleString()}
                  </div>
                  <div className="text-gray-500">per month</div>
                </div>
              </div>
            </div>

            {/* Description */}
            {pg.description && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">About This PG</h2>
                <p className="text-gray-700 leading-relaxed">{pg.description}</p>
              </div>
            )}

            {/* Room Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Room Details</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Sharing Type</div>
                    <div className="font-semibold text-gray-900">{pg.sharingType}</div>
                  </div>
                </div>

                {pg.facilities?.roomSize && (
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Maximize className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Room Size</div>
                      <div className="font-semibold text-gray-900">{pg.facilities.roomSize}</div>
                    </div>
                  </div>
                )}

                {pg.facilities?.bedType && (
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Bed className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Bed Type</div>
                      <div className="font-semibold text-gray-900">{pg.facilities.bedType}</div>
                    </div>
                  </div>
                )}

                {pg.facilities?.furnishing && (
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <DoorOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Furnishing</div>
                      <div className="font-semibold text-gray-900">{pg.facilities.furnishing}</div>
                    </div>
                  </div>
                )}
              </div>

              {pg.facilities && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-4">
                    {pg.facilities.attached && (
                      <div className="flex items-center gap-2 text-green-700">
                        <Check className="h-5 w-5" />
                        <span>Attached Bathroom</span>
                      </div>
                    )}
                    {pg.facilities.balcony && (
                      <div className="flex items-center gap-2 text-green-700">
                        <Check className="h-5 w-5" />
                        <span>Balcony</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {pg.amenities?.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-orange-600">
                      {amenityIcons[amenity] || <Shield className="h-5 w-5" />}
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            {pg.rules && pg.rules.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">House Rules</h2>
                <ul className="space-y-3">
                  {pg.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      </div>
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Timing */}
            {pg.timing && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Timings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pg.timing.gateClosing && (
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-red-100 rounded-lg">
                        <Clock className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Gate Closing</div>
                        <div className="font-semibold text-gray-900">{pg.timing.gateClosing}</div>
                      </div>
                    </div>
                  )}
                  {pg.timing.visitingHours && (
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Visiting Hours</div>
                        <div className="font-semibold text-gray-900">{pg.timing.visitingHours}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <ReviewSection 
              pgId={id}
              reviews={pg.reviews}
              rating={pg.rating}
              onReviewAdded={fetchPGDetails}
            />
          </div>

          {/* Sidebar - Contact & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-6">Contact Information</h3>
                
                {pg.contactInfo && (
                  <div className="space-y-4 mb-6">
                    {pg.contactInfo.ownerName && (
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Owner Name</div>
                        <div className="font-semibold text-gray-900">{pg.contactInfo.ownerName}</div>
                      </div>
                    )}
                    {pg.contactInfo.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-orange-500" />
                        <div>
                          <div className="text-sm text-gray-500">Phone</div>
                          <div className="font-semibold text-gray-900">{pg.contactInfo.phone}</div>
                        </div>
                      </div>
                    )}
                    {pg.contactInfo.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-orange-500" />
                        <div>
                          <div className="text-sm text-gray-500">Email</div>
                          <div className="font-semibold text-gray-900 text-sm break-all">
                            {pg.contactInfo.email}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-3">
                  {/* Edit and Delete Buttons - Only show to owner */}
                  {user && pg.contactInfo?.email === user.email && (
                    <>
                      <button 
                        onClick={() => navigate(`/edit-pg/${id}`)}
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Edit className="h-5 w-5" />
                        Edit Listing
                      </button>
                      
                      <button 
                        onClick={() => setShowDeleteConfirm(true)}
                        className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Trash2 className="h-5 w-5" />
                        Delete Listing
                      </button>
                    </>
                  )}
                  
                  <button className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" />
                    Call Now
                  </button>
                  <button className="w-full border-2 border-orange-500 text-orange-600 py-3 px-6 rounded-xl font-semibold hover:bg-orange-50 transition-all">
                    Schedule Visit
                  </button>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4">Location</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">{pg.location}</div>
                      {pg.address && (
                        <div className="text-sm text-gray-600 mt-1">{pg.address}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    {pg.distance} from college
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gradient-to-br from-orange-100 to-rose-100 rounded-2xl p-6">
                <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sharing Type:</span>
                    <span className="font-semibold text-gray-900">{pg.sharingType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Gender:</span>
                    <span className="font-semibold text-gray-900">{pg.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Availability:</span>
                    <span className={`font-semibold ${pg.available ? 'text-green-600' : 'text-red-600'}`}>
                      {pg.available ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Delete PG Listing</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <strong>{pg?.name}</strong>? 
              This will permanently remove the listing from the website.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={handleDeletePG}
                disabled={deleting}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-5 w-5" />
                    Yes, Delete
                  </>
                )}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}