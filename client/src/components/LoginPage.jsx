import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../api/auth';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data.email, data.password);
      const { token } = result;
      login(token);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">Access your account</p>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: 'Invalid email format',
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
