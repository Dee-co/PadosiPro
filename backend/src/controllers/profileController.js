import prisma from '../utils/prisma.js';
export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        mobile: true,
        address: true,
        businessName: true,
        isEmailVerified: true,
        profileCompleted: true,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching profile',
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      mobile,
      address,
      businessName,
    } = req.body;
    if (!name || !mobile || !address) {
      return res.status(400).json({
        success: false,
        message: 'Name, mobile and address are required',
      });
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number must be a valid 10-digit Indian mobile number',
      });
    }
    const user = await prisma.user.update({
      where: {
        id: req.user.userId,
      },
      data: {
        name: name.trim(),
        mobile: mobile.trim(),
        address: address.trim(),
        businessName: businessName?.trim() || null,
        profileCompleted: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        mobile: true,
        address: true,
        businessName: true,
        isEmailVerified: true,
        profileCompleted: true,
      },
    });
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while updating profile',
    });
  }
};