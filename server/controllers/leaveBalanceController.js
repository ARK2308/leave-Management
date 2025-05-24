const LeaveBalance = require('../models/LeaveBalance');

// Admin: Add or update yearly leave entitlement
exports.setLeaveBalance = async (req, res) => {
  try {
    const { employee, year, totalLeaves } = req.body;

    let balance = await LeaveBalance.findOne({ employee, year });
    if (balance) {
      balance.totalLeaves = totalLeaves;
      await balance.save();
      return res.json({ message: 'Leave balance updated', balance });
    }

    const newBalance = new LeaveBalance({ employee, year, totalLeaves });
    await newBalance.save();
    res.status(201).json({ message: 'Leave balance set', balance: newBalance });
  } catch (error) {
    res.status(500).json({ message: 'Error updating balance', error });
  }
};
