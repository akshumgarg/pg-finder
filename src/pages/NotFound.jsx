import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-display font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl font-display font-bold text-gray-800 mt-4 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
        </div>
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
