export default function FilterPanel({ filters, onFilterChange, onReset }) {
  const handlePriceChange = (value, index) => {
    const newRange = [...filters.priceRange];
    newRange[index] = parseInt(value);
    onFilterChange({ ...filters, priceRange: newRange });
  };

  const handleSharingTypeChange = (type) => {
    const updated = filters.sharingType.includes(type)
      ? filters.sharingType.filter(t => t !== type)
      : [...filters.sharingType, type];
    onFilterChange({ ...filters, sharingType: updated });
  };

  const handleAmenityChange = (amenity) => {
    const updated = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    onFilterChange({ ...filters, amenities: updated });
  };

  const handleGenderChange = (value) => {
    onFilterChange({ ...filters, gender: value });
  };

  const handleDistanceChange = (value) => {
    onFilterChange({ ...filters, distance: parseFloat(value) });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display font-bold text-gray-900">Filters</h2>
        <button
          onClick={onReset}
          className="text-sm text-orange-600 hover:text-orange-700 font-medium"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Price Range
          </label>
          <div className="space-y-3">
            <div className="flex gap-3">
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(e.target.value, 0)}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Min"
              />
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(e.target.value, 1)}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Max"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>₹{filters.priceRange[0].toLocaleString()}</span>
              <span>₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Distance */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Distance from College
          </label>
          <input
            type="range"
            min="0.5"
            max="10"
            step="0.5"
            value={filters.distance}
            onChange={(e) => handleDistanceChange(e.target.value)}
            className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
          />
          <div className="text-sm text-gray-600 mt-2">
            Within <span className="font-semibold text-orange-600">{filters.distance} km</span>
          </div>
        </div>

        {/* Sharing Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Sharing Type
          </label>
          <div className="space-y-2">
            {['Single', 'Double Sharing', 'Triple Sharing', 'Four Sharing'].map((type) => (
              <label
                key={type}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.sharingType.includes(type)}
                  onChange={() => handleSharingTypeChange(type)}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Gender Preference */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Gender Preference
          </label>
          <div className="space-y-2">
            {[
              { value: 'all', label: 'All' },
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Co-living', label: 'Co-living' }
            ].map(({ value, label }) => (
              <label
                key={value}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="gender"
                  value={value}
                  checked={filters.gender === value}
                  onChange={() => handleGenderChange(value)}
                  className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Amenities
          </label>
          <div className="space-y-2">
            {['WiFi', 'Meals', 'AC', 'Parking', 'Laundry', 'Security'].map((amenity) => (
              <label
                key={amenity}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
