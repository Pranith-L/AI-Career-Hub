const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  // Using Gmail or any SMTP. Configured via env vars.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"AI CareerHub" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error('Email sending failed:', err.message);
    // Non-fatal — don't crash the server if email fails
  }
};

const welcomeEmailTemplate = (name) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 32px; background: #f8fafc; border-radius: 12px;">
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="background: linear-gradient(135deg, #2563eb, #22c55e); display: inline-block; padding: 12px 20px; border-radius: 10px; color: white; font-weight: 800; font-size: 20px;">AI CareerHub</div>
    </div>
    <h2 style="color: #1e293b;">Welcome aboard, ${name}! 🎉</h2>
    <p style="color: #64748b; line-height: 1.6;">You've successfully joined <strong>AI CareerHub</strong> — your AI-powered career development platform.</p>
    <p style="color: #64748b; line-height: 1.6;">Here's what you can do:</p>
    <ul style="color: #64748b; line-height: 2;">
      <li>📄 Build ATS-optimized resumes with Gemini AI</li>
      <li>🎤 Practice mock interviews with dynamic AI questions</li>
      <li>💼 Browse curated job opportunities</li>
      <li>🗺️ Get a personalized career roadmap</li>
    </ul>
    <div style="text-align: center; margin: 32px 0;">
      <a href="http://localhost:5173/dashboard" style="background: linear-gradient(135deg, #2563eb, #22c55e); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 700;">Go to Dashboard →</a>
    </div>
    <p style="color: #94a3b8; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} AI CareerHub. All rights reserved.</p>
  </div>
`;

module.exports = { sendEmail, welcomeEmailTemplate };
