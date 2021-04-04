import { ClientError } from './base-errors';
import { UserErrorDataType } from '../types/user-type';

// eslint-disable-next-line no-shadow
export enum UserErrorCode{
  NotFound,
  NotMatchedPassword,
  UserAlreadyExists,
  NotProtectedPassword,
  NotAuthorizationHeader,
  PermissionDenied,
}

// @ts-ignore
export const UserErrorData:UserErrorDataType = Object.entries({
  [UserErrorCode.NotFound]: {
    status: 404,
    message: '회원이 존재하지 않습니다.',
  },
  [UserErrorCode.NotMatchedPassword]: {
    status: 404,
    message: '회원이 존재하지 않거나 패스워드가 일치하지 않습니다.',
  },
  [UserErrorCode.UserAlreadyExists]: {
    status: 409,
    message: '회원이 이미 존재합니다.',
  },
  [UserErrorCode.NotProtectedPassword]: {
    status: 400,
    message: '안전한 패스워드가 아닙니다.',
  },
  [UserErrorCode.NotAuthorizationHeader]: {
    status: 401,
    message: '인증헤더가 올바르지 않습니다.',
  },
  [UserErrorCode.PermissionDenied]: {
    status: 401,
    message: '권한이 없습니다.',
  },
})
  .map((item) => ({
    [item[0]]: {
      ...item[1],
      code: UserErrorCode[UserErrorCode[item[0] as any] as any],
    },
  }))
  .reduce((x, y) => ({
    ...x,
    ...y,
  }));

export class UserError extends ClientError {
  constructor(errorCode: UserErrorCode) {
    const error = UserErrorData[errorCode];
    super(error.message, error.status, error.code); // TODO : 다국어 처리는 어떻게 할 것인가?
  }
}
