import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
});
export const sendOtpEmail = async (email, otp) => {
  console.log("Starting email send:", email);
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "PadosiPro Email Verification OTP",
    text: `Your PadosiPro verification OTP is ${otp}. It is valid for 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>PadosiPro Email Verification</h2>
        <p>Your verification OTP is:</p>

        <h1 style="letter-spacing: 6px;">${otp}</h1>

        <p>This OTP is valid for <strong>10 minutes</strong>.</p>
        <p>If you did not request this OTP, you can safely ignore this email.</p>
      </div>
    `,
  });
  console.log("Email sent successfully:", info.messageId);
};