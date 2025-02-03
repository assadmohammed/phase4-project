import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../components/api';
import Header from './Header';
import '../styles/Login.css';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(loginData.email, loginData.password);
      localStorage.setItem('token', response.data.access_token); // Store JWT token
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
      navigate('/packages'); // Redirect to packages page
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-page">
      <Header />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          {error && <p className="error">{error}</p>}
          <div className="input-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={loginData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;