const express = require('express');
const router = express.Router();
const { setLeaveBalance } = require('../controllers/leaveBalanceController');

// Only admin/manager should access this route
router.post('/set', setLeaveBalance);

module.exports = router;
