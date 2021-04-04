import Bcrypt from 'bcrypt';
import Joi from 'joi';
import TimeStampRepository from '../lib/dynamodb/timestamp-repository';
import { User, UserExcludedPassword } from '../types/user-type';
import { UserError, UserErrorCode } from '../errors/user-errors';

class UserRepository extends TimeStampRepository<User> {
  constructor() {
    super(
      'User',
      Joi.object({
        username: Joi.string()
          .alphanum()
          .min(3)
          .max(30)
          .required(),
        lastName: Joi.string()
          .min(3)
          .max(10)
          .required(),
        firstName: Joi.string()
          .min(3)
          .max(10)
          .required(),
        password: Joi.string()
          .required(),
        email: Joi.string()
          .email(),
        division: Joi.number()
          .required(),
      }),
    );
  }

  private passwordSchema = Joi.object({
    password: Joi.string()
      .min(3)
      .max(30)
      .required(),
  })

  public async get(key: any): Promise<any | UserExcludedPassword | null> {
    const user: any = await super.get(key);
    if (user) {
      delete user.password;
      return user as unknown as UserExcludedPassword ?? null;
    }
    return null;
  }

  private async getWithPassword(key: any): Promise<User | null> {
    return await super.get(key);
  }

  public async put(key: any, args: any) {
    if (await this.passwordSafetyCheck(args.password)) {
      await super.put(key, {
        ...args,
        password: await this.encryption(null, args.password),
      });
    } else {
      throw new UserError(UserErrorCode.NotProtectedPassword);
    }
  }

  private SALT_ROUNDS = 10;
  private async encryption(salt: string | null = null, password: string) {
    const pass = await Bcrypt.hash(password, await Bcrypt.genSalt(this.SALT_ROUNDS));
    return pass;
  }

  public async validatePassword(username: string, password: string) {
    const user = await this.getWithPassword({ username });
    if (user) {
      const isMatched = await Bcrypt.compare(password, user.password);
      return isMatched;
    }
    return false;
  }

  protected async passwordSafetyCheck(password: string) {
    const result = await this.passwordSchema.validate({ password });
    return !result.error;
  }
}

const userRepository = new UserRepository();

export default userRepository;
