import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage'; // Import လုပ်ပါ
import LoginPage from './pages/LoginPage';     // Import လုပ်ပါ
import RegisterPage from './pages/RegisterPage'; // Import လုပ်ပါ
import ProtectedRoute from './components/ProtectedRoute'; // Import လုပ်ပါ
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}