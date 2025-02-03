import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation(); // Get the current route location
  const isLoggedIn = localStorage.getItem('token'); // Check if the user is logged in

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    localStorage.removeItem('user'); // Remove user data
    window.location.href = '/login'; // Redirect to the login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>HAMA travelco.</h1>
      </div>
      <div className="navbar-links">
        <Link
          to="/about"
          className={location.pathname === '/about' ? 'active' : ''}
        >
          About
        </Link>
        <Link
          to="/contact"
          className={location.pathname === '/contact' ? 'active' : ''}
        >
          Contact
        </Link>
        <Link
          to="/packages"
          className={location.pathname === '/packages' ? 'active' : ''}
        >
          Packages
        </Link>
      </div>
      <div className="navbar-auth">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className={location.pathname === '/login' ? 'active' : ''}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className={location.pathname === '/signup' ? 'active' : ''}
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;