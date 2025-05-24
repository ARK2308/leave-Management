const mongoose = require('mongoose');

const leaveBalanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  year: {
    type: Number,
    required: true
  },
  totalLeaves: {
    type: Number,
    default: 25
  },
  usedLeaves: {
    type: Number,
    default: 0
  },
  carryForward: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('LeaveBalance', leaveBalanceSchema);
