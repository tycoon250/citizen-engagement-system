import express from 'express';
import { getAgencyStats, getCitizenStats } from '../controllers/complaintStatsController.js';

const router = express.Router();

router.get('/citizen/:userId', getCitizenStats);
router.get('/agency/:userId', getAgencyStats);
// router.get('/admin/summary', getAdminStats);

export default router;
