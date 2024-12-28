import { API_URL } from './apiConfig';

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const result = await response.json();
    localStorage.setItem('token', result.token);
    return result;
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};
