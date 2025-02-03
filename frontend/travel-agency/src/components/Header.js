import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <Link to="/" className="header-link">HOME</Link>
        <Link to="/contact" className="header-link">Contact us</Link>
        <Link to="/packages" className="header-link">Packages</Link>
      </nav>
    </header>
  );
};

export default Header;