import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail', // Default to gmail, but can be configured
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify transporter connection
transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

// Contact Route
app.post('/api/contact', async (req, res) => {
    const { name, phone, vehicleYear, vehicleMake, vehicleModel, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Sending to yourself
        subject: `New Contact Form Submission from ${name}`,
        html: `
            <h3>New Contact Form Submission from dynamicautorepair.com</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Vehicle:</strong> ${vehicleYear} ${vehicleMake} ${vehicleModel}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email.' });
    }
});

// ------------------------------------------------------------------------------------------------------------
// Nodemailer Transporter
const laserTransporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail', // Default to gmail, but can be configured
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify transporter connection
laserTransporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Server is ready to take our messages');
    }
});
// TX LASER COMBAT PATH
app.post('/api/contact/tx-laser-combat', async (req, res) => {
    const { laserName, laserPhone, laserMessage } = req.body;

    const laserMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Sending to yourself
        subject: `New Contact Form Submission from txlasercombat.com`,
        html: `
            <h3>New Contact Form Submission from txlasercombat.com</h3>
            <p><strong>Name:</strong> ${laserName}</p>
            <p><strong>Phone:</strong> ${laserPhone}</p>
            <p><strong>Message:</strong></p>
            <p>${laserMessage}</p>
        `,
    };

    try {
        await laserTransporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
