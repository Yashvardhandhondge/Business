import express from 'express';
import { createBusiness, deleteBusiness, getAllBusiness, getBusinessById, updateBusiness, addNewMetric, updateMetric, deleteMetric } from '../controllers/business';
import { isAuthenticated } from '../middleware/auth';
import validate from '../middleware/validate';
import { createBusinessValidator, newMetricSchema, updateBusinessValidator, updateMetricSchema   } from '../validators/business';

const router = express.Router();

router.post('/', validate(createBusinessValidator), createBusiness);
router.put('/:id', validate(updateBusinessValidator), updateBusiness);
router.get("/", isAuthenticated, getAllBusiness);
router.get('/:id', getBusinessById);
router.delete('/:id', isAuthenticated, deleteBusiness);
router.post('/add-metric/:id', validate(newMetricSchema), addNewMetric);
router.put('/update-metric/:id', validate(updateMetricSchema), updateMetric);
router.delete('/delete-metric/:id', validate(updateMetricSchema), deleteMetric);    
export default router;