import { register, login } from '../controllers/auth-controller.js';
import prisma from '../../prisma/prisma_client.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
jest.mock('../../prisma/prisma_client.js', () => ({
  user: {
    findFirst: jest.fn(),
    create: jest.fn()
  }
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compareSync: jest.fn()
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
}));

jest.mock('dotenv', () => ({
  config: jest.fn()
}));

describe('AuthController', () => {
  describe('register', () => {
    it('returns an error if required fields are missing', async () => {
      const req = { body: { username: '', email: '', password: '' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
    });

    it('returns an error if user with the same email already exists', async () => {
      const req = { body: { username: 'test', email: 'test@example.com', password: 'password' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      prisma.user.findFirst.mockResolvedValue({ email: 'test@example.com' });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User with such email already exists' });
    });

    it('creates a new user if email is unique', async () => {
      const req = { body: { username: 'test', email: 'test@example.com', password: 'password' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      prisma.user.findFirst.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      prisma.user.create.mockResolvedValue({ name: 'test', email: 'test@example.com' });

      await register(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: { name: 'test', email: 'test@example.com', password: 'hashedPassword' }
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'You are successfully registered!' });
    });
  });

  describe('login', () => {
    it('returns an error if email or password is missing', async () => {
      const req = { body: { email: '', password: '' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Email and password are required' });
    });

    it('returns an error if the user is not found', async () => {
      const req = { body: { email: 'test@example.com', password: 'password' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      prisma.user.findFirst.mockResolvedValue(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid login or password' });
    });

    it('returns an error if password does not match', async () => {
      const req = { body: { email: 'test@example.com', password: 'password' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      prisma.user.findFirst.mockResolvedValue({ email: 'test@example.com', password: 'hashedPassword' });
      bcrypt.compareSync.mockReturnValue(false);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid login or password' });
    });

    it('returns a token if login is successful', async () => {
      const req = { body: { email: 'test@example.com', password: 'password' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockUser = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
      prisma.user.findFirst.mockResolvedValue(mockUser);
      bcrypt.compareSync.mockReturnValue(true);
      jwt.sign.mockReturnValue('mockedToken');

      await login(req, res);

      expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser.id }, process.env.SECRET_KEY, { expiresIn: '24h' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Login successfull', token: 'mockedToken' });
    });
  });
});