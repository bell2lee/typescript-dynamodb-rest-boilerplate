import { User, UserPermission, UserExcludedPassword } from '../types/user-type';
import UserRepository from '../repositories/user-repository';
import { UserError, UserErrorCode } from '../errors/user-errors';

export async function getUser(username: User['username']): Promise<UserExcludedPassword | null> {
  const user = await UserRepository.get({ username });
  return user ?? null;
}

export async function getUsers() {

}

export async function overWriteUser(
  args: {
    username: User['username'],
    email: User['email'],
    password: User['password'],
    firstName: User['firstName'],
    lastName: User['lastName'],
    division: User['division'],
  },
) {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    division,
  } = args;
  await UserRepository.put({
    username,
  }, {
    email,
    password,
    firstName,
    lastName,
    division,
    permission: UserPermission.EXHIBITOR,
  });
}

export async function register(
  args: {
    username: User['username'],
    email: User['email'],
    password: User['password'],
    firstName: User['firstName'],
    lastName: User['lastName'],
    division: User['division'],
  },
) {
  const { username } = args;
  const user = await UserRepository.get({ username });
  if (!user) {
    await overWriteUser(args);
  } else {
    throw new UserError(UserErrorCode.UserAlreadyExists);
  }
}

export async function updateUser(
  args: {
    username: User['username'],
    email: User['email'],
    password: User['password'],
    firstName: User['firstName'],
    lastName: User['lastName'],
    division: User['division'],
  },
) {
  const { username, email, password, firstName, lastName, division } = args;
  await UserRepository.update({
    username,
  }, {
    ...email && { email },
    ...password && { password },
    ...firstName && { firstName },
    ...lastName && { lastName },
    ...division && { division },
  });
}
