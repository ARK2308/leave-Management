const express = require('express');
const router = express.Router();
const {
  applyLeave,
  getMyLeaves,
  updateLeave,
  getAllPendingLeaves,
  approveLeave,
  rejectLeave
} = require('../controllers/leaveController');

// EMPLOYEE
router.post('/apply', applyLeave);
router.get('/my-leaves/:id', getMyLeaves);
router.put('/update/:id', updateLeave);

// MANAGER
router.get('/pending', getAllPendingLeaves);
router.put('/approve/:id', approveLeave);
router.put('/reject/:id', rejectLeave);

module.exports = router;
