import bcrypt from "bcrypt";
import prisma from "../utils/prisma.js";
import { generateOtp, getOtpExpiry, hasOtp } from "../utils/otp.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { sendOtpEmail } from "../utils/emailService.js";
export const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, Password and Confirm Password are required",
      });
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email address",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords not match",
      });
    }
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (existingUser) {
      if (existingUser.isEmailVerified) {
        return res.status(409).json({
          success: false,
          message: "Email is already registered",
        });
      }
      return res.status(409).json({
        success: false,
        message: "Email is already registered but not verified",
      });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const otp = generateOtp();
    const codeHash = await hasOtp(otp);
    const expiresAt = getOtpExpiry();
    const user = await prisma.$transaction(async (transaction) => {
      const createdUser = await transaction.user.create({
        data: {
          email: normalizedEmail,
          passwordHash,
          isEmailVerified: false,
        },
      });
      await transaction.emailOtp.create({
        data: {
          userId: createdUser.id,
          codeHash,
          expiresAt,
          attempts: 0,
          used: false,
        },
      });
      return createdUser;
    });
    console.log("OTP generated", normalizedEmail, otp);
    await sendOtpEmail(normalizedEmail, otp);
    return res.status(201).json({
      success: true,
      message:
        "Registration successful. Please verify your email with the OTP.",
      data: {
        userId: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while registering",
    });
  }
};
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "OTP must be a 6-digit number",
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    const otpRecord = await prisma.emailOtp.findFirst({
      where: {
        userId: user.id,
        used: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "No active OTP found",
      });
    }
    if (otpRecord.attempts >= 5) {
      return res.status(429).json({
        success: false,
        message: "Maximum OTP attempts exceeded",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }
    const isValidOtp = await bcrypt.compare(otp, otpRecord.codeHash);
    if (!isValidOtp) {
      const updatedOtp = await prisma.emailOtp.update({
        where: {
          id: otpRecord.id,
        },
        data: {
          attempts: {
            increment: 1,
          },
        },
      });
      const remainingAttempts = 5 - updatedOtp.attempts;
      return res.status(400).json({
        success: false,
        message: `Invalid OTP. ${remainingAttempts} attempts remaining`,
      });
    }
    await prisma.$transaction([
      prisma.emailOtp.update({
        where: {
          id: otpRecord.id,
        },
        data: {
          used: true,
        },
      }),
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isEmailVerified: true,
        },
      }),
    ]);
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying OTP",
    });
  }
};
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }
    const latestOtp = await prisma.emailOtp.findFirst({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (latestOtp) {
      const now = new Date();
      const elapsedSeconds =
        (now.getTime() - latestOtp.createdAt.getTime()) / 1000;
      const cooldownSeconds = 30;
      if (elapsedSeconds < cooldownSeconds) {
        const remainingSeconds = Math.ceil(cooldownSeconds - elapsedSeconds);
        return res.status(429).json({
          success: false,
          message: `Please wait ${remainingSeconds} seconds before requesting a new OTP`,
        });
      }
    }
    await prisma.emailOtp.updateMany({
      where: {
        userId: user.id,
        used: false,
      },
      data: {
        used: true,
      },
    });
    const otp = generateOtp();
    const codeHash = await hasOtp(otp);
    const expiresAt = getOtpExpiry();
    await prisma.emailOtp.create({
      data: {
        userId: user.id,
        codeHash,
        expiresAt,
        attempts: 0,
        used: false,
      },
    });
    console.log("New OTP generated:", normalizedEmail, otp);
    await sendOtpEmail(normalizedEmail, otp);
    return res.status(200).json({
      success: true,
      message: "A new OTP has been generated successfully",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while resending OTP",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    if (!user.isEmailVerified) {
      const latestOtp = await prisma.emailOtp.findFirst({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      let shouldSendOtp = true;
      if (latestOtp) {
        const elapsedSeconds =
          (new Date().getTime() - latestOtp.createdAt.getTime()) / 1000;

        if (elapsedSeconds < 30) {
          shouldSendOtp = false;
        }
      }
      if (shouldSendOtp) {
        await prisma.emailOtp.updateMany({
          where: {
            userId: user.id,
            used: false,
          },
          data: {
            used: true,
          },
        });
        const otp = generateOtp();
        const codeHash = await hasOtp(otp);
        const expiresAt = getOtpExpiry();
        await prisma.emailOtp.create({
          data: {
            userId: user.id,
            codeHash,
            expiresAt,
            attempts: 0,
            used: false,
          },
        });
        console.log("Login OTP generated:", normalizedEmail, otp);
        await sendOtpEmail(normalizedEmail, otp);
      }
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in",
        code: "EMAIL_NOT_VERIFIED",
      });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    const refreshTokenExpiresAt = new Date();
    refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7);
    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshTokenHash,
        expiresAt: refreshTokenExpiresAt,
        revoked: false,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          mobile: user.mobile,
          address: user.address,
          businessName: user.businessName,
          isEmailVerified: user.isEmailVerified,
          isProfileCompleted: user.profileCompleted,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging in",
    });
  }
};
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }
    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }
    if (payload.type !== "refresh") {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
    const refreshTokens = await prisma.refreshToken.findMany({
      where: {
        userId: payload.userId,
        revoked: false,
      },
    });
    let matchedToken = null;
    for (const refreshTokenRecord of refreshTokens) {
      const isMatch = await bcrypt.compare(token, refreshTokenRecord.tokenHash);
      if (isMatch) {
        matchedToken = refreshTokenRecord;
        break;
      }
    }
    if (!matchedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
    if (matchedToken.expiresAt < new Date()) {
      await prisma.refreshToken.update({
        where: {
          id: matchedToken.id,
        },
        data: {
          revoked: true,
        },
      });
      return res.status(401).json({
        success: false,
        message: "Refresh token has expired",
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: "Email is not verified",
      });
    }
    const accessToken = generateAccessToken(user);
    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while refreshing token",
    });
  }
};
export const logout = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }
    const refreshTokens = await prisma.refreshToken.findMany({
      where: {
        userId: req.user.userId,
        revoked: false,
      },
    });
    let matchedToken = null;
    for (const refreshTokenRecord of refreshTokens) {
      const isMatch = await bcrypt.compare(token, refreshTokenRecord.tokenHash);

      if (isMatch) {
        matchedToken = refreshTokenRecord;
        break;
      }
    }
    if (!matchedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
    await prisma.refreshToken.update({
      where: {
        id: matchedToken.id,
      },
      data: {
        revoked: true,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging out",
    });
  }
};
