const Leave = require('../models/Leave');
const sendEmail = require('../utils/sendEmail');
const ukHolidays = require('../utils/ukHolidays');
const LeaveBalance = require('../models/LeaveBalance');

// apply leave 
exports.applyLeave = async (req, res) => {
    try {
      const { fromDate, toDate, employee, reason, type } = req.body; // if you want type, include it here
  
      // Validate required fields
      if (!fromDate || !toDate || !employee || !reason) {
        return res.status(400).json({ message: 'Missing required leave fields' });
      }
  
      // Check if leave overlaps with UK holidays
      let current = new Date(fromDate);
      const end = new Date(toDate);
      let holidayConflicts = [];
  
      while (current <= end) {
        const dayStr = current.toISOString().slice(0, 10);
        if (ukHolidays.includes(dayStr)) {
          holidayConflicts.push(dayStr);
        }
        current.setDate(current.getDate() + 1);
      }
  
      // Save the leave
      const leaveData = {
        employee,
        fromDate,
        toDate,
        reason,
        status: 'pending',
      };
  
      // If you want to support 'type', add it in the schema and here
      if (type) {
        leaveData.type = type;
      }
  
      const leave = new Leave(leaveData);
      await leave.save();
  
      // Populate employee info for email (like name or email)
      const populatedLeave = await leave.populate('employee', 'name email').execPopulate();
  
      const employeeInfo = populatedLeave.employee.name || populatedLeave.employee.email || populatedLeave.employee._id;
  
      // Send email to manager/admin
      await sendEmail({
        to: 'abdulark500@gmail.com',
        subject: 'New Leave Application Submitted',
        text: `A new leave has been applied by ${employeeInfo}.\n\nLeave Dates: ${new Date(leave.fromDate).toDateString()} to ${new Date(leave.toDate).toDateString()}\nReason: ${leave.reason}${leave.type ? `\nType: ${leave.type}` : ''}`
      });
  
      // Prepare success message with holiday info
      const message = holidayConflicts.length
        ? `Leave submitted successfully. Note: These date(s) fall on UK holidays and won't count as leave: ${holidayConflicts.join(', ')}`
        : 'Leave submitted successfully.';
  
      res.status(201).json({ message, leave: populatedLeave });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error applying leave', error });
    }
  };
// Get My Leaves
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employee: req.params.id });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaves', error });
  }
};

// Update Leave (Only if pending)
exports.updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave || leave.status !== 'pending') {
      return res.status(400).json({ message: 'Leave not found or cannot be edited' });
    }

    Object.assign(leave, req.body);
    await leave.save();
    res.json({ message: 'Leave updated', leave });
  } catch (error) {
    res.status(500).json({ message: 'Error updating leave', error });
  }
};

// Manager: Get All Pending Leaves
exports.getAllPendingLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ status: 'pending' }).populate('employee', 'name email');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending leaves', error });
  }
};

// Approve Leave

exports.approveLeave = async (req, res) => {
    try {
      const leave = await Leave.findById(req.params.id);
      if (!leave) return res.status(404).json({ message: 'Leave not found' });
  
      if (leave.status !== 'pending') {
        return res.status(400).json({ message: 'Only pending leaves can be approved' });
      }
  
      // ✅ Step 1: Calculate working days (excluding UK holidays)
      let count = 0;
      let current = new Date(leave.startDate);
      const endDate = new Date(leave.endDate);
  
      while (current <= endDate) {
        const dayStr = current.toISOString().slice(0, 10);
        if (!ukHolidays.includes(dayStr)) {
          count++;
        }
        current.setDate(current.getDate() + 1);
      }
  
      // ✅ Step 2: Check & Deduct from Leave Balance
      const year = new Date().getFullYear();
      let balance = await LeaveBalance.findOne({ employee: leave.employee, year });
  
      if (!balance) {
        return res.status(400).json({ message: 'Leave balance not found for this employee' });
      }
  
      const totalAvailable = balance.totalLeaves + balance.carryForward;
      if (balance.usedLeaves + count > totalAvailable) {
        return res.status(400).json({ message: 'Not enough leave balance' });
      }
  
      balance.usedLeaves += count;
      await balance.save();
  
      // ✅ Step 3: Approve Leave
      leave.status = 'approved';
      await leave.save();
  
      res.json({ message: 'Leave approved and leave balance updated', leave, daysDeducted: count });
    } catch (error) {
      res.status(500).json({ message: 'Error approving leave', error });
    }
  };

// Reject Leave
exports.rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    leave.status = 'rejected';
    leave.rejectionReason = req.body.rejectionReason || 'Not specified';
    await leave.save();
    res.json({ message: 'Leave rejected', leave });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting leave', error });
  }
};
