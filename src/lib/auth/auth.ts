import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import fs from 'fs';
import bcrypt from 'bcrypt';
import { findUserByEmail } from '../database/userQueryExecutor.js';
import { User } from '../../models/user.js';
import { authUser } from '../../models/authUser.js';
import { AUTH_CONFIGH } from '../../config/authconf.js';

const JWT_SECRET = fs.readFileSync(AUTH_CONFIGH.SECRET_KEY);
const PUBLIC_KEY = fs.readFileSync(AUTH_CONFIGH.PUBLIC_KEY);

export const userAuthenticate = async (
  email: string,
  password: string,
): Promise<User | undefined | null> => {
  try {
    // ユーザー情報を取得
    const result: authUser[] | null = await findUserByEmail(email);
    // Eメールアドレスとパスワードを検証
    if (result && result.length === 1 && (await bcrypt.compare(password, result[0].password))) {
      const { id, name, age, department } = {
        ...result[0],
      };
      const user = new User(id, name, age, email, department);
      return user;
    } else {
      return undefined;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getToken = (email: string): string => {
  const jwtPayload = {
    email: email,
  };

  const jwtOptions = {
    algorithm: AUTH_CONFIGH.ALGORITHM,
    expiresIn: AUTH_CONFIGH.EXPIRES,
  } as SignOptions;

  const token = jwt.sign(jwtPayload, JWT_SECRET, jwtOptions);
  return token;
};

// token検証
export const verifyToken = (token: string): string | jwt.Jwt | jwt.JwtPayload | undefined => {
  let decodeStr: string | jwt.Jwt | jwt.JwtPayload | undefined = undefined;

  const option = {
    algorithms: [AUTH_CONFIGH.ALGORITHM],
  } as VerifyOptions;

  jwt.verify(token, PUBLIC_KEY, option, (err, decoded) => {
    if (err) {
      console.log(err);
    } else {
      decodeStr = decoded;
    }
  });

  return decodeStr;
};
