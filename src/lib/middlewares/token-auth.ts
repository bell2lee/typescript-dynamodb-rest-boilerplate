import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import * as userService from '../../services/user-service';
import { UserError, UserErrorCode } from '../../errors/user-errors';
import { User, UserExcludedPassword, UserPermission } from '../../types/user-type';

const tokenChecker = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];
    try {
      const user = await jwt.verify(token, process.env.API_SECRET_KEY || 'dsa') as { username: User['username'] };

      req.context = {
        user: await userService.getUser(user.username),
      };
    } catch (e) {
      throw new UserError(UserErrorCode.NotAuthorizationHeader);
    }
  } else {
    throw new UserError(UserErrorCode.NotAuthorizationHeader);
  }
};

const permissionChecker = async (user: UserExcludedPassword, permission: UserPermission) => {
  return user && user.permission >= permission;
};

export const baseTokenAuth = async (req: Request, res: Response, next: NextFunction) => {
  await tokenChecker(req, res, next);
  next();
};

export const onlyExhibitorTokenAuth = async (req: Request, res: Response, next: NextFunction) => {
  await tokenChecker(req, res, next);
  if (req.context.user && await permissionChecker(req.context.user, UserPermission.EXHIBITOR)) {
    next();
  } else {
    throw new UserError(UserErrorCode.PermissionDenied);
  }
};

export const onlyExhibitorManagerTokenAuth = async (req: Request, res: Response, next: NextFunction) => {
  await tokenChecker(req, res, next);
  if (req.context.user && await permissionChecker(req.context.user, UserPermission.EXHIBITION_MANAGER)) {
    next();
  } else {
    throw new UserError(UserErrorCode.PermissionDenied);
  }
};

export const onlyAdminTokenAuth = async (req: Request, res: Response, next: NextFunction) => {
  await tokenChecker(req, res, next);
  if (req.context.user && await permissionChecker(req.context.user, UserPermission.ADMINISTRATOR)) {
    next();
  } else {
    throw new UserError(UserErrorCode.PermissionDenied);
  }
};
