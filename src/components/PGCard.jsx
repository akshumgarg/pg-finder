import { Link } from 'react-router-dom';
import { MapPin, Users, Star, Wifi, Utensils } from 'lucide-react';

export default function PGCard({ pg }) {
  const mainImage = pg.images && pg.images.length > 0 ? pg.images[0] : 'https://via.placeholder.com/400x300';

  return (
    <Link to={`/pg/${pg._id}`}>
      <div className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-52 overflow-hidden">
          <img
            src={mainImage}
            alt={pg.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {pg.available && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              Available
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-display font-bold text-xl text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
              {pg.name}
            </h3>
            <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium whitespace-nowrap ml-2">
              {pg.gender}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1 text-orange-500 flex-shrink-0" />
            <span className="line-clamp-1">{pg.location}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span className="text-blue-600 font-medium">{pg.distance}</span>
            <span className="mx-2 text-gray-400">•</span>
            <Users className="h-4 w-4 mr-1" />
            <span>{pg.sharingType}</span>
          </div>

          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            {pg.amenities?.includes('WiFi') && (
              <div className="flex items-center text-xs text-gray-600">
                <Wifi className="h-3.5 w-3.5 mr-1 text-orange-500" />
                WiFi
              </div>
            )}
            {pg.amenities?.includes('Meals') && (
              <div className="flex items-center text-xs text-gray-600">
                <Utensils className="h-3.5 w-3.5 mr-1 text-orange-500" />
                Meals
              </div>
            )}
            {pg.amenities && pg.amenities.length > 2 && (
              <div className="text-xs text-gray-500">
                +{pg.amenities.length - 2} more
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            {/* Only show rating if there are reviews */}
            {pg.reviews && pg.reviews.length > 0 ? (
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-semibold text-gray-900">{pg.rating?.toFixed(1)}</span>
                <span className="text-sm text-gray-500 ml-1">
                  ({pg.reviews.length})
                </span>
              </div>
            ) : (
              <div className="text-sm text-gray-500">No reviews yet</div>
            )}
            
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">
                ₹{pg.price?.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">per month</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
