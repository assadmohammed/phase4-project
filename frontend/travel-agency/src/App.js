import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Packages from './components/Packages';
import About from './components/About';
import Contact from './components/Contact';
import Review from './components/Review';
import ProtectedRoute from './components/ProtectedRoutes'; // Import the ProtectedRoute
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Navbar />
                <Hero />
              </>
            }
          />

          {/* Auth Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Main Routes */}
          <Route
            path="/packages"
            element={
              <ProtectedRoute>
                <Packages />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/review/:packageId"
            element={
              <ProtectedRoute>
                <Review />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;