import express, { NextFunction, Request, Response } from 'express';
import { BaseError, ClientError } from '../../errors/base-errors';

const ErrorHandler = (err:any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ClientError) {
    const error: ClientError = err;

    res.status(error.status).json({
      error: error.message,
      code: error.code,
    });
  } else if (err instanceof BaseError) {
    const error: BaseError = err;
    res.status(error.status).json({
      error: error.message,
    });
  } else {
    // 예상 밖 에러가 발생할 경우 서버에 기록을 남긴다.
    console.error(err);
    // console.error(req);

    res.status(500).json({ msg: 'Internal Error' });
  }
};

export default ErrorHandler;
