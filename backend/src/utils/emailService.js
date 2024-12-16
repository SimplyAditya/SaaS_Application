const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send email
const sendEmail = async (to, subject, htmlContent) => {
    try {
        const mailOptions = {
            from: `${process.env.EMAIL_USER}`,
            to,
            subject,
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${to}`);
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw new Error('Could not send email. Please try again later.');
    }
};

module.exports = sendEmail;
