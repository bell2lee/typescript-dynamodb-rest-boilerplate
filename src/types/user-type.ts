// eslint-disable-next-line no-shadow
export enum UserPermission{
  EXHIBITOR = 10,
  EXHIBITION_MANAGER = 30,
  ADMINISTRATOR = 999,
}

export type UserName = string;
export type Email = string;
export type Password = string;
export type LastName = string;
export type FirstName = string;
export type Division = string;

export interface UserErrorDataType {
  [code: string]: {
    status: number,
    message: string,
    code: number,
  },
}

export interface User{
  username: UserName,
  email: Email,
  password: Password,
  lastName: LastName,
  firstName: FirstName,
  permission: UserPermission,
  division: Division,
}

export interface UserExcludedPassword{
  username: User['username'],
  email: User['email'],
  lastName: User['lastName'],
  firstNname: User['firstName'],
  permission: User['permission'],
  division: User['division'],
}
