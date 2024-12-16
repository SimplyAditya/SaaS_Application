
const express = require('express');
const router = express.Router();
const stripe = require('../config/stripe');
const sendEmail = require('../utils/emailService');
const dotenv = require('dotenv');
dotenv.config();

router.post('/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const email = session.customer_email;
        const planId = session.line_items.data[0].price.product;
        const userCount = session.line_items.data[0].quantity;

        const plan = await Plan.findOne({ stripeProductId: planId });
        if (plan) {
            const htmlContent = `
                <h1>Payment Successful</h1>
                <p>Dear Customer,</p>
                <p>Thank you for subscribing to the ${plan.name} plan.</p>
                <p>Details:</p>
                <ul>
                    <li>Plan: ${plan.name}</li>
                    <li>Price: INR ${plan.price} per user</li>
                    <li>User Count: ${userCount}</li>
                </ul>
                <p>We appreciate your business!</p>
            `;
            await sendEmail(email, 'Payment Confirmation', htmlContent);
        }
    }

    res.json({ received: true });
});

module.exports = router;