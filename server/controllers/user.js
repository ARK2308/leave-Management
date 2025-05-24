// const User = require('../models/User');
// const Leave = require('../models/Leave');

// // @desc    Get all users
// exports.getAllUsers = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');

//     // Only admins can see all users
//     if (user.role !== 'admin') {
//       return res.status(401).json({ msg: 'Not authorized' });
//     }

//     const users = await User.find().select('-password');
//     res.json(users);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// // @desc    Get user by ID
// exports.getUserById = async (req, res) => {
//   try {
//     const requestingUser = await User.findById(req.user.id).select('-password');
//     const user = await User.findById(req.params.id).select('-password');

//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     // Users can only see their own profile or admins can see any
//     if (requestingUser.role !== 'admin' && requestingUser.id !== user.id) {
//       return res.status(401).json({ msg: 'Not authorized' });
//     }

//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(404).json({ msg: 'User not found' });
//     }
//     res.status(500).send('Server error');
//   }
// };

// // @desc    Update user
// exports.updateUser = async (req, res) => {
//   try {
//     const requestingUser = await User.findById(req.user.id).select('-password');
//     const user = await User.findById(req.params.id).select('-password');

//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     // Only admins can update other users or users can update themselves
//     if (requestingUser.role !== 'admin' && requestingUser.id !== user.id) {
//       return res.status(401).json({ msg: 'Not authorized' });
//     }

//     const { name, email, role, department } = req.body;

//     // Only admins can change roles
//     if (role && requestingUser.role !== 'admin') {
//       return res.status(401).json({ msg: 'Not authorized to change roles' });
//     }

//     user.name = name || user.name;
//     user.email = email || user.email;
//     user.role = role || user.role;
//     user.department = department || user.department;

//     await user.save();

//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// // @desc    Update user leave balance
// exports.updateLeaveBalance = async (req, res) => {
//   try {
//     const requestingUser = await User.findById(req.user.id).select('-password');

//     // Only admins can update leave balances
//     if (requestingUser.role !== 'admin') {
//       return res.status(401).json({ msg: 'Not authorized' });
//     }

//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     const { annual, carryForward } = req.body;

//     user.leaveBalance.annual = annual;
//     user.leaveBalance.carryForward = carryForward;

//     await user.save();

//     res.json(user.leaveBalance);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// // @desc    Delete user
// exports.deleteUser = async (req, res) => {
//   try {
//     const requestingUser = await User.findById(req.user.id).select('-password');

//     // Only admins can delete users
//     if (requestingUser.role !== 'admin') {
//       return res.status(401).json({ msg: 'Not authorized' });
//     }

//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     // Prevent deleting self
//     if (requestingUser.id === user.id) {
//       return res.status(400).json({ msg: 'Cannot delete yourself' });
//     }

//     // Delete all leaves associated with the user
//     await Leave.deleteMany({ user: user.id });

//     await user.remove();

//     res.json({ msg: 'User removed' });
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(404).json({ msg: 'User not found' });
//     }
//     res.status(500).send('Server error');
//   }
// };