import { Admin } from '../models/admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateTokens } from '../utils/jwtToken.js';
import { sendResetEmail } from '../helpers/mail.helper.js';


//create new user
export const newAdmin = async (body) => {
  try {
    const existingAgent = await Admin.findOne({ where: { email: body.email } });
    if (existingAgent) {
      return { success: false, message: 'Email already in use' };
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const adminData = {
      fullName: body.fullName,
      email: body.email,
      password: hashedPassword,
      mobileNumber: body.mobileNumber,
    };
    console.log('Creating Agent with data:', adminData);

    const data = await Admin.create(adminData);

    return {
      success: true,
      message: 'Admin created successfully...',
      agent: data,
    };
  } catch (error) {
    console.error('Error creating Admin:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};


export const adminLogin = async (body) => {
  try {
    if (!body.email || !body.password) {
      return { success: false, message: 'Email and password are required' };
    }

    const data = await Admin.findOne({ where: { email: body.email } });
    if (!data) {
      return { success: false, message: 'Admin not found' };
    }

    const isMatch = await bcrypt.compare(body.password, data.password);
    if (!isMatch) {
      return { success: false, message: 'Invalid credentials' };
    }

    // Generate tokens
    let accessToken, refreshToken;
    try {
      ({ accessToken, refreshToken } = generateTokens({
        id: data.adminID,
        role: data.role,
      }));
    } catch (tokenError) {
      console.error('Token generation error:', tokenError.message);
      return { success: false, message: 'Failed to generate tokens' };
    }

    // Return success response
    return {
      success: true,
      email: data.email,
      role: data.role,
      userID: data.adminID,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error('Login error:', error.message);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};


//admin refresh token
export const adminRefreshToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET_ADMIN);
    const { id } = decoded;

    const admin = await Admin.findByPk(id);
    if (!admin) {
      return { success: false, message: 'admin not found' };
    }

    // Generate new tokens (access & refresh)
    const { accessToken } = generateTokens({ id, role: admin.role });

    // Send new tokens back
    return {
      success: true,
      accessToken,
    };
  } catch (error) {
    console.error('Refresh token error:', error);
    return { success: false, message: 'Invalid refresh token' };
  }
};



//admin forgot password
export const adminForgotPassword = async (email) => {
  try {
    const data = await Admin.findOne({ where: { email: email } });
    if (!data) {
      return { success: false, message: 'Agent not found' };
    }

    const { accessToken } = generateTokens({ id: data.adminID, role: data.role });
    const result = await sendResetEmail(data.email, `http://localhost:3000/reset-password.html?token=${accessToken}`);

    if (result.success) {
      return {
        success: true,
        message: `Password reset link sent to your email: http://localhost:3000/reset-password.html?token=${accessToken}`,
        email: data.email,
      };
    }
    return { success: false, message: 'Failed to send password reset link.' };
  } catch (error) {
    console.error('Error sending password reset link:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};



export const adminResetPassword = async (token, password, confirmPassword) => {
  try {
    if (password !== confirmPassword) {
      return { success: false, message: 'Passwords do not match' };
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_SECRET_ADMIN);
      console.log('Decoded token:', decoded);

    } catch (error) {
      console.error('Token verification failed:', error);
      return { success: false, message: 'Invalid or expired token' };
    }

    const admin = await Admin.findByPk(decoded.id);
    if (!admin) {
      return { success: false, message: 'Admin not found' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    admin.password = hashedPassword;
    await admin.save();

    return { success: true, message: 'Password reset successfully' };
  } catch (error) {
    console.error('Error resetting password:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};




