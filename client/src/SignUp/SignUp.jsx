import React from 'react';
import { useForm } from 'react-hook-form';
import './SignUp.css';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = (data) => {
    console.log('Registration Data:', data);
    alert(`Welcome, ${data.email}`);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="signup-title">Registration</h1>
        <p className="signup-subtitle">Create an account to access</p>
        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"

              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === watch('password') || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="signin-text">
          Already have an account? <a href="/LoginPage">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
