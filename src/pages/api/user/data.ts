import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/usersModel';

const JWT_SECRET_KEY = process.env.JWT_SECRET as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    await dbConnect();

    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    if (typeof decoded === 'string') {
      return res.status(400).json({ message: 'Invalid token structure' });
    }

    const { userID } = decoded;

    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ username: user.username, role: user.role, country: user.country });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to authenticate token' });
  }
}
