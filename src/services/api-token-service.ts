import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/user-repository';
import { User } from '../types/user-type';
import { UserError, UserErrorCode } from '../errors/user-errors';

const secret: string = process.env.API_SECRET_KEY || 'dsa';

export async function getJWTToken(args: {
  username: User['username'],
  password: User['password'],
}) {
  const { username, password } = args;
  const authed = await UserRepository.validatePassword(username, password);
  if (!authed) throw new UserError(UserErrorCode.NotFound);
  const token = await jwt.sign({
    username,
  }, secret, {
    expiresIn: '7d',
    // issuer: 'domain',
    subject: 'userInfo',
  });
  return token;
}
