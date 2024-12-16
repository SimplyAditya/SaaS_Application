const express = require('express');
const { createPlan, getPlans, deletePlan, updatePlan, getPlanById } = require('../controllers/planController');
const router = express.Router();
const dotenv = require('dotenv');
const { authorize } = require('../middleware/roleMiddleware');
dotenv.config();

router.post('/', createPlan);
router.get('/', getPlans);
router.get('/:id', getPlanById); // Add route to get a specific plan by ID
router.put('/:id', updatePlan);
router.delete('/:id', deletePlan);


// , authorize(['Admin'])
module.exports = router;
