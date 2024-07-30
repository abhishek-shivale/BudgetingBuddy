import jwt from "jsonwebtoken";

export const getToken = (email: string, secret: string, time: string) => {
  return jwt.sign({email:email}, secret, {
    expiresIn: time,
    algorithm: "HS256",
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};

export const getRefreshToken = (email: string) => {
  return getToken(email, process.env?.REFRESH_TOKEN as string, "15d");
};

export const getAccessToken = (email: string) => {
  return getToken(email, process.env?.ACCESS_TOKEN as string, "15m");
};

export const verifyRefreshToken = (token: string) => {
  return verifyToken(token, process.env?.REFRESH_TOKEN as string);
};

export const verifyAccessToken = (token: string) => {
  return verifyToken(token, process.env?.ACCESS_TOKEN as string);
};

export const getEmailToken = async (email: string) => {
  return getToken(email, process.env?.EMAIL_TOKEN as string, "10m");
};

export const verifyEmailToken = async (token: string) => {
  return verifyToken(token, process.env?.EMAIL_TOKEN as string);
};
