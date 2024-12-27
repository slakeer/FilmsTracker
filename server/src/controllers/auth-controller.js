import prisma from '../../prisma/prisma_client.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config("./");

const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const exUser = await prisma.user.findFirst({
        where: { email }
    });
    if (exUser) {
        return res.status(400).json({message: 'User with such email already exists'});
    }

    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: { 
            name: username, 
            email: email, 
            password: hashed 
        }
    });

    res.status(201).json({message: 'You are successfully registered!'})
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({message: 'Email and password are required'});
    }

    const user = await prisma.user.findFirst({
        where: { email }
    });
    if (!user) {
        return res.status(400).json({message: 'Invalid login or password'});
    }
    if(!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({message: 'Invalid login or password'});
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '24h' });
    res.status(200).json({message: 'Login successfull', token});
};

export { register, login };