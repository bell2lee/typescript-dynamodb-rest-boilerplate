import express from 'express';
import * as userService from '../services/user-service';
import { UserError, UserErrorCode } from '../errors/user-errors';
import * as authMiddleware from '../lib/middlewares/token-auth';

const router = express.Router();

router.get('/', async (req, res) => {
  // users
});

router.get('/:username', authMiddleware.onlyExhibitorTokenAuth, async (req, res) => {
  const user = await userService.getUser(req.params.username);
  if (!user) throw new UserError(UserErrorCode.NotFound);
  res.status(200).json(user);
});

router.post('/', async (req, res) => {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    division,
  } = req.body;

  await userService.register({
    username,
    email,
    password,
    firstName,
    lastName,
    division,
  });
  res.status(201).json({ msg: 'created' });
});

router.put('/', async (req, res) => {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    division,
  } = req.body;
  await userService.overWriteUser({
    username,
    email,
    password,
    firstName,
    lastName,
    division,
  });
  res.status(201).json({ msg: 'updated' });
});

router.patch('/:username', async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    division,
  } = req.body;
  await userService.updateUser({
    username: req.params.username,
    email,
    password,
    firstName,
    lastName,
    division,
  });
});

export default router;
