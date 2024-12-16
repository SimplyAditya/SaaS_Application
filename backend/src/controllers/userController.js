const User = require('../models/User');
const Organization = require('../models/Organization');
const Plan = require('../models/Plan'); // Ensure Plan model is imported
const dotenv = require('dotenv');
dotenv.config();

const createUser = async (req, res) => {
    try {
        const { referenceUserId, ...userData } = req.body;
        const currentUser = await User.findById(referenceUserId);

        if (!currentUser.subscriptionAdmin) {
            return res.status(403).json({ message: 'Only subscription admins can create users.' });
        }
        const referenceUser = await User.findById(referenceUserId);

        const plan = await Plan.findById(referenceUser.plan);
        if (!plan) {
            return res.status(404).json({ message: 'Plan not found for the reference user.' });
        }
        if (referenceUser.otherUsers.length >= plan.userLimit) {
            return res.status(400).json({ message: 'User limit exceeded for the reference user.' });
        }
        const newUser = new User({
            ...userData,
            referenceUserId: referenceUser._id,
            subscriptionAdmin: false,
            role: "User",
        });

        await newUser.save();
        referenceUser.otherUsers.push(newUser._id);
        await referenceUser.save();

        res.status(201).json(newUser);
    } catch (error) {
      console.log(error.message)
        res.status(500).json({ message: error.message });
    }
};

const updateUserPlan = async (req, res) => {
    try {
        const { userId, newPlanId } = req.body;
        const user = await User.findById(userId).populate('otherUsers');

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const newPlan = await Plan.findById(newPlanId);
        if (!newPlan) {
            return res.status(404).json({ message: 'New plan not found.' });
        }

        user.planId = newPlan._id;
        await user.save();

        if (user.subscriptionAdmin) {
            for (const otherUser of user.otherUsers) {
                const newUser = await User.findById(otherUser);
                newUser.plan = newPlan._id;
                await newUser.save();
            }
        }

        res.status(200).json({ message: 'Plan updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrganizations = async (req, res) => {
  try {
    const organizations = await User.find({ 'subscriptionAdmin': true, role: "User" });
    const currentDate = new Date();
    console.log(organizations);
    const formattedOrganizations = await Promise.all(organizations.map(async org => {
      const status = org.valid && org.valid > currentDate ? 'Active' : 'Inactive';
      let billingStatus = 'Paid';

      if (org.planId) {
        const planEndDate = org.valid;
        const daysRemaining = (planEndDate - currentDate) / (1000 * 60 * 60 * 24);

        if (daysRemaining <= 0) {
          billingStatus = 'Overdue';
        } else if (daysRemaining <= 7) {
          billingStatus = 'Upcoming';
        }
      }
      const plan = await Plan.findById(org.planId);
      return {
        id: org._id,
        name: org.name,
        plan:  plan ? plan.name : 'No Plan',
        users: org.otherUsers.length,
        storage: org.planId ? `${org.planId.storage}GB` : 'N/A',
        lastBilling: org.valid ? org.valid.toISOString().split('T')[0] : 'N/A',
        status,
        billingStatus,
      };
    }));
    console.log(formattedOrganizations)
    res.json(formattedOrganizations);
  } catch (err) {
    console.log(err.message )
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getOtherUsers = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: 'userId is required in query params.' });
        }

        const user = await User.findById(userId).populate({
            path: 'otherUsers',
            select: '-password'
        });
        console.log(user) 

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json(user.otherUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    updateUserPlan,
    getOrganizations,
    getOtherUsers, // Export the new function
};

