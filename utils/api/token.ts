'use server';
import { User } from '@/Types/Types';
import jwt from 'jsonwebtoken';

export const getJwtToken = async (data: User, secret: string, time: string) => {
  return await jwt.sign({ data }, secret, {
    expiresIn: time,
    algorithm: 'HS256',
  });
};

export const verifyJwtToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};

export const decodeJwtToken = (token: string) => {
  return jwt.decode(token);
};

export const getToken = (data: User) => {
  return getJwtToken(data, process.env?.TOKEN as string, '1Y');
};

export const verifyToken = (token: string) => {
  return verifyJwtToken(token, process.env?.TOKEN as string);
};
