'use server';
import jwt from 'jsonwebtoken';

export const getJwtToken = async (
  email: string,
  secret: string,
  time: string,
) => {
  return await jwt.sign({ email: email as string }, secret, {
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

export const getToken = (email: string) => {
  return getJwtToken(email, process.env?.TOKEN as string, '1Y');
};

export const verifyToken = (token: string) => {
  return verifyJwtToken(token, process.env?.TOKEN as string);
};
