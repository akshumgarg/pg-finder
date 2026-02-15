import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, Home, X, Plus, User, LogOut } from 'lucide-react';
import { pgAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import PGCard from '../components/PGCard';
import FilterPanel from '../components/FilterPanel';

const defaultFilters = {
  priceRange: [3000, 20000],
  sharingType: [],
  gender: 'all',
  amenities: [],
  distance: 10,
};

export default function HomePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    fetchPGs();
  }, []);

  const fetchPGs = async () => {
    try {
      setLoading(true);
      const response = await pgAPI.getAll();
      setPgs(response.data.data);
    } catch (error) {
      console.error('Error fetching PGs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPGs = useMemo(() => {
    return pgs.filter((pg) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !pg.name.toLowerCase().includes(query) &&
          !pg.location.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // Price filter
      if (pg.price < filters.priceRange[0] || pg.price > filters.priceRange[1]) {
        return false;
      }

      // Sharing type filter
      if (filters.sharingType.length > 0 && !filters.sharingType.includes(pg.sharingType)) {
        return false;
      }

      // Gender filter
      if (filters.gender !== 'all' && pg.gender !== filters.gender) {
        return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((amenity) =>
          pg.amenities.includes(amenity)
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      // Distance filter
      const pgDistance = parseFloat(pg.distance.split(' ')[0]);
      if (pgDistance > filters.distance) {
        return false;
      }

      return true;
    });
  }, [pgs, searchQuery, filters]);

  const handleResetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-orange-500 to-rose-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                <Home className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                  PG Finder
                </h1>
                <p className="text-xs text-gray-500">Find Your Perfect Stay</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-3">
              {/* Add PG Button - Only show to authenticated users */}
              {isAuthenticated && (
                <Link
                  to="/add-pg"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  <Plus className="h-5 w-5" />
                  Add PG
                </Link>
              )}

              {/* Auth Buttons or User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border-2 border-orange-200 rounded-lg hover:border-orange-400 transition-all"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-rose-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-700">{user?.name}</span>
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowUserMenu(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <Link
                          to="/my-pgs"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          My PGs
                        </Link>
                        <Link
                          to="/favorites"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Favorites
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium rounded-lg hover:bg-orange-50 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <SlidersHorizontal className="h-5 w-5" />
                Filters
              </button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by PG name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-orange-100 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-rose-600 to-pink-600 text-white py-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}/>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-5xl font-display font-bold mb-4 leading-tight">
            Find Your Perfect PG
          </h2>
          <p className="text-xl text-orange-50 max-w-2xl">
            Discover comfortable and affordable paying guest accommodations near your college. 
            Your home away from home awaits.
          </p>
          <div className="mt-8 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-orange-100">{pgs.length}+ Properties</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-orange-100">Verified Listings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-orange-100">Safe & Secure</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetFilters}
              />
            </div>
          </aside>

          {/* Mobile Filter Overlay */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setShowFilters(false)}>
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-4">
                  <FilterPanel
                    filters={filters}
                    onFilterChange={setFilters}
                    onReset={handleResetFilters}
                  />
                </div>
              </div>
            </div>
          )}

          {/* PG Listings */}
          <main className="flex-1">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-display font-bold text-gray-800">
                  Available Properties
                </h3>
                <p className="text-gray-600 mt-1">
                  {filteredPGs.length} {filteredPGs.length === 1 ? 'property' : 'properties'} found
                </p>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-600"></div>
              </div>
            ) : filteredPGs.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                <MapPin className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg mb-2">
                  No properties found matching your criteria
                </p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your filters to see more results
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPGs.map((pg) => (
                  <PGCard key={pg._id} pg={pg} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-display font-bold text-xl mb-4">PG Finder</h4>
              <p className="text-gray-400">
                Making it easier for students and professionals to find their perfect accommodation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">List Your Property</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PG Finder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
