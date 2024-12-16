const express = require('express');
const { createUser, getUsersByOrganization, getOrganizations, getOtherUsers, updateUserPlan } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.post('/', createUser);
router.get('/organizations',  getOrganizations);
router.get('/otherUsers', getOtherUsers);
router.put('/update-plan', updateUserPlan); // Applied authentication middleware
// router.get('/:organizationId', authenticate, authorize(['Admin']), getUsersByOrganization);

module.exports = router;
