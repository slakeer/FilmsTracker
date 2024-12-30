import { loginUser, registerUser } from './api/auth';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('auth functions', () => {
  describe('loginUser', () => {
    it('should login the user and store token in localStorage', async () => {
      const mockResponse = { token: '123abc' };

      fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

      const result = await loginUser('test@example.com', 'password');

      expect(result.token).toBe('123abc');
      expect(localStorage.setItem).toHaveBeenCalledWith('token', '123abc');
    });

    it('should throw an error if login fails', async () => {
      fetchMock.mockRejectOnce(new Error('Invalid credentials'));

      await expect(
        loginUser('test@example.com', 'wrongPassword')
      ).rejects.toThrow('Invalid credentials');
    });

    it('should handle network errors gracefully', async () => {
      fetchMock.mockRejectOnce(new Error('Network request failed'));

      await expect(loginUser('test@example.com', 'password')).rejects.toThrow(
        'Network request failed'
      );
    });
  });

  describe('registerUser', () => {
    it('should register the user successfully', async () => {
      const mockResponse = { userId: 1, email: 'test@example.com' };

      fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

      const result = await registerUser('test@example.com', 'password');

      expect(result.userId).toBe(1);
      expect(result.email).toBe('test@example.com');
    });

    it('should throw an error if registration fails', async () => {
      fetchMock.mockRejectOnce(new Error('Registration failed'));

      await expect(
        registerUser('test@example.com', 'password')
      ).rejects.toThrow('Registration failed');
    });

    it('should handle network errors gracefully', async () => {
      fetchMock.mockRejectOnce(new Error('Network request failed'));

      await expect(
        registerUser('test@example.com', 'password')
      ).rejects.toThrow('Network request failed');
    });
  });
});
