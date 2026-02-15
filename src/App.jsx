import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import PGDetailPage from './pages/PGDetailPage';
import AddPGPage from './pages/AddPGPage';
import EditPGPage from './pages/EditPGPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router basename="/pg-finder"> {/* Add basename */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pg/:id" element={<PGDetailPage />} />
          <Route path="/add-pg" element={<AddPGPage />} />
          <Route path="/edit-pg/:id" element={<EditPGPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;