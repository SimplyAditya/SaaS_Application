const Plan = require("../models/Plan");
const User = require("../models/User"); // Import User model
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const createPlan = async (req, res) => {
  const { name, price, userLimit, description, daysValidity } = req.body;
  try {
    const product = await axios.post(
      "https://api.stripe.com/v1/products",
      new URLSearchParams({
        name: `${name}`,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.STRIPE_SECRET_KEY,
          password: "",
        },
      }
    );

    const stripeProductId = product.data.id;
    const response = await axios.post(
      "https://api.stripe.com/v1/prices",
      new URLSearchParams({
        unit_amount: price * 100,
        currency: "inr",
        "recurring[interval]": "year",
        product: stripeProductId,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.STRIPE_SECRET_KEY,
          password: "",
        },
      }
    );
    const stripePriceId = response.data.id;
    const plan = new Plan({
      name,
      price,
      userLimit,
      description,
      daysValidity,
      stripeProductId,
      stripePriceId,
    });
    await plan.save();
    res.status(201).json({ message: "Plan created successfully", plan });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getPlans = async (req, res) => {
  try {
    const plans = await Plan.aggregate([
      {
        $lookup: {
          from: "users", // Collection name in MongoDB is usually plural
          localField: "_id",
          foreignField: "plan",
          as: "enrolledUsers",
        },
      },
      {
        $addFields: {
          totalEnrolled: { $size: "$enrolledUsers" },
        },
      },
      {
        $project: {
          enrolledUsers: 0, // Exclude the enrolledUsers array from the result
        },
      },
    ]);

    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getPlanById = async (req, res) => {
  try {
    const planId = req.params.id; // Retrieve planId from URL parameters
    const plan = await Plan.findById(planId);
    
    if (!plan) {
      return res.status(404).json({ message: "Plan not found." });
    }

    res.status(200).json(plan);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updatePlan = async (req, res) => {
  try {
    const planId = req.params.id; // Retrieve planId from URL params
    const updateData = req.body;  // Get the rest of the update data

    const plan = await Plan.findById(planId);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found." });
    }

    const stripeUpdates = {};

    if (updateData.name && updateData.name !== plan.name) {
      plan.name = updateData.name;
      stripeUpdates.name = updateData.name;
    }

    if (updateData.description && updateData.description !== plan.description) {
      plan.description = updateData.description;
      stripeUpdates.description = updateData.description;
    }

    if (updateData.price && updateData.price !== plan.price) {
      plan.price = updateData.price;
      const newPrice = await axios.post(
        "https://api.stripe.com/v1/prices",
        new URLSearchParams({
          product: plan.stripeProductId,
          unit_amount: updateData.price * 100, // Ensure proper currency conversion
          currency: "inr",
          recurring: "year",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth: {
            username: process.env.STRIPE_SECRET_KEY,
            password: "",
          },
        }
      );
      plan.stripePriceId = newPrice.data.id;
    }

    if (Object.keys(stripeUpdates).length > 0) {
      await axios.post(
        `https://api.stripe.com/v1/products/${plan.stripeProductId}`,
        new URLSearchParams(stripeUpdates),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth: {
            username: process.env.STRIPE_SECRET_KEY,
            password: "",
          },
        }
      );
    }

    await plan.save();
    res.status(200).json({ message: "Plan updated successfully.", plan });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deletePlan = async (req, res) => {
  try {
    const planId = req.params.id;
    const plan = await Plan.findById(planId);
    console.log(plan);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found." });
    }

    const User = require("../models/User");
    const enrolledUsers = await User.find({ planId: planId });
    if (enrolledUsers.length > 0) {
      return res.status(400).json({
        message: "Cannot delete plan. Users are enrolled in this plan.",
      });
    }
    try {
      const response = await axios.post(
        `https://api.stripe.com/v1/products/${plan.stripeProductId}`,
        new URLSearchParams({ active: "false" }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth: {
            username: process.env.STRIPE_SECRET_KEY,
            password: "",
          },
        }
      );
      console.log("Product archived:", response.data);
    } catch (err) {
      console.error("Error archiving product:", err.message);
    }

    // console.log("Plan", planToDelete);
    await Plan.findByIdAndDelete(planId);
    res.status(200).json({ message: "Plan deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
  getPlanById, // Export the new function
};
