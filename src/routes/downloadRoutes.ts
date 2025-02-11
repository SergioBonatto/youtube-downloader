import { Router, Request, Response, NextFunction } from 'express';
import { DownloadController } from '../controllers/downloadController';
import { body, validationResult } from 'express-validator';

const router = Router();
const downloadController = new DownloadController();

router.post(
  '/download',
  [
    body('url')
      .isURL()
      .withMessage('Invalid URL')
      .matches(/^https?:\/\/(www\.)?youtube\.com/)
      .withMessage('URL must be from YouTube')
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  downloadController.download
);

export default router;
