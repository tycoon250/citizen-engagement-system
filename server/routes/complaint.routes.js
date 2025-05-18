import express from 'express';
import {
  submitComplaint,
  getComplaintsByUser,
  respondToComplaint,
  getComplaintsWithResponsesByUser,
  getComplaintsByAgency,
  updateComplaintStatus,
} from '../controllers/complaint.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/', protect, restrictTo('citizen'), submitComplaint);
router.get('/:userId', protect, restrictTo('citizen', 'admin'), getComplaintsByUser);
router.post('/:id/respond', protect, restrictTo('agency', 'admin'), respondToComplaint);
router.get('/:userId/full', protect, restrictTo('citizen', 'admin'), getComplaintsWithResponsesByUser);
router.get('/agency/:userId', protect, restrictTo('agency', 'admin'), getComplaintsByAgency);
router.patch('/:id/status', protect, restrictTo('admin', 'agency', 'citizen'), updateComplaintStatus);
export default router;
