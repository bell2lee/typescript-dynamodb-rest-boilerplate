import express from 'express';
import * as apiService from '../services/api-token-service';

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const token = await apiService.getJWTToken({ username, password });
  res.status(201).json({ token });
});

export default router;
