// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/users');
// const auth = require('../middleware/authMiddleware');
// const { check } = require('express-validator');

// // @route   GET api/users
// // @desc    Get all users (Admin only)
// // @access  Private
// router.get('/', auth, userController.getAllUsers);

// // @route   GET api/users/:id
// // @desc    Get user by ID
// // @access  Private
// router.get('/:id', auth, userController.getUserById);

// // @route   PUT api/users/:id
// // @desc    Update user (Admin only)
// // @access  Private
// router.put('/:id', auth, userController.updateUser);

// // @route   PUT api/users/:id/leave-balance
// // @desc    Update user leave balance (Admin only)
// // @access  Private
// router.put(
//   '/:id/leave-balance',
//   [
//     auth,
//     [
//       check('annual', 'Annual leave balance is required').not().isEmpty(),
//       check('carryForward', 'Carry forward balance is required').not().isEmpty()
//     ]
//   ],
//   userController.updateLeaveBalance
// );

// // @route   DELETE api/users/:id
// // @desc    Delete user (Admin only)
// // @access  Private
// router.delete('/:id', auth, userController.deleteUser);

// module.exports = router;