# PG Finder Frontend

Modern, responsive React application for browsing and finding PG accommodations.

## Features

- Browse PG listings with beautiful card layouts
- Advanced filtering system
- Search by name and location
- Dedicated detail pages for each PG
- Fully responsive design
- Smooth animations and transitions
- Modern gradient-based UI design

## Tech Stack

- React 18
- Vite (build tool)
- React Router v6
- Tailwind CSS
- Axios (HTTP client)
- Lucide React (icons)

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── PGCard.jsx     # PG listing card component
│   └── FilterPanel.jsx # Filter sidebar component
├── pages/             # Page components
│   ├── HomePage.jsx   # Main listing page
│   ├── PGDetailPage.jsx # PG detail page
│   └── NotFound.jsx   # 404 page
├── services/          # API services
│   └── api.js         # Axios configuration and API calls
├── App.jsx            # Main app with routing
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Components

### HomePage
Main page displaying all PG listings with:
- Search bar
- Filter sidebar (desktop) / modal (mobile)
- Grid of PG cards
- Responsive layout

### PGDetailPage
Detailed view of a single PG with:
- Image gallery
- Complete property information
- Room details and facilities
- Amenities grid
- Contact information
- Location details
- Action buttons

### PGCard
Reusable card component showing:
- Property image
- Name and location
- Price and sharing type
- Rating and reviews
- Quick amenity icons
- Availability badge

### FilterPanel
Advanced filtering with:
- Price range selection
- Distance slider
- Sharing type checkboxes
- Gender preference radio buttons
- Amenities checkboxes
- Reset functionality

## Routing

- `/` - Home page (listing)
- `/pg/:id` - PG detail page
- `*` - 404 Not Found page

## Styling

The application uses:
- Tailwind CSS for utility-first styling
- Custom gradient themes (orange to rose)
- Playfair Display font for headings
- Inter font for body text
- Custom scrollbar styling
- Responsive breakpoints

## API Integration

All API calls are centralized in `src/services/api.js`:

```javascript
import { pgAPI } from './services/api';

// Get all PGs
const pgs = await pgAPI.getAll(params);

// Get single PG
const pg = await pgAPI.getById(id);
```

## Design Features

- Gradient backgrounds and buttons
- Smooth hover effects
- Card elevation on hover
- Responsive image galleries
- Mobile-first approach
- Sticky headers
- Loading states
- Empty states

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lazy loading of images
- Optimized bundle size with Vite
- Code splitting with React Router
- Memoized filter calculations
- Efficient re-renders

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: {
    // Your custom colors
  }
}
```

### Fonts
Modify the font imports in `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont');
```

## Development Tips

1. Use React DevTools for debugging
2. Check console for API errors
3. Test responsive design at different breakpoints
4. Verify filter functionality after changes
5. Test routing with direct URL navigation

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
