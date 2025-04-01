const nodemailer = require("nodemailer");

const sendMail = async (to, subject, text, html = "") => {
  try {
    console.log(to);
    // Create transporter using SMTP settings
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can change this to another email provider
      auth: {
        user: process.env.EMAIL_USER, // Your email address (from .env)
        pass: process.env.EMAIL_PASS, // Your email password (from .env)
      },
      tls: {
        rejectUnauthorized: false, // Disable SSL certificate validation
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to, // Recipient email(s)
      subject, // Email subject
      text, // Plain text body
      html, // HTML body (optional)
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = sendMail;
