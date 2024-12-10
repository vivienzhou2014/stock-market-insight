import React, { useState } from 'react';
import './index.css'; // Ensure your provided CSS is saved as App.css

interface LoginPageProps {
  onLoginSuccess: () => void; // Callback to notify successful login
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [error, setError] = useState('');

  // Handle login logic
  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      onLoginSuccess(); // Notify App of successful login
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <h1 style={{ color: 'white' }}>Login</h1>

      {/* Username Input */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />

      {/* Password Input with Eye Button */}
      <div style={{ position: 'relative', display: 'inline-block', marginTop: '10px' }}>
  <input
    type={showPassword ? 'text' : 'password'} // Toggle input type
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={{
      width: '300px',
      padding: '10px 40px 10px 10px', // Add padding for the eye icon
      borderRadius: '25px',
      border: '2px solid transparent',
      outline: 'none',
      transition: 'all 0.3s ease',
    }}
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)} // Toggle visibility
    style={{
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: '#999',
      fontSize: '18px', // Adjust size of the icon
      lineHeight: 1,
    }}
  >
    {showPassword ? '👁️' : '🙈'} {/* Eye icon */}
  </button>
</div>
      <br />

      {/* Login Button */}
      <button onClick={handleLogin}>Login</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;