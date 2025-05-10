import { Client } from '../models/client.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateTokens } from '../utils/jwtToken.js';
import { sendResetEmail } from '../helpers/mail.helper.js';




//create new user
export const newClient = async (body) => {
  try {
    const existingUser = await Client.findOne({ where: { email: body.email } });
    if (existingUser) {
      return { success: false, message: 'Email already in use' };
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const userData = {
      fullName: body.fullName,
      email: body.email,
      password: hashedPassword,
      mobileNumber: body.mobileNumber,
    };
    console.log('Creating Client with data:', userData);

    const data = await Client.create(userData);

    return {
      success: true,
      message: 'Client created successfully...',
      user: data,
    };
  } catch (error) {
    console.error('Error creating Client:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};





export const clientLogin = async (body) => {
  try {
    if (!body.email || !body.password) {
      return { success: false, message: 'Email and password are required' };
    }

    const data = await Client.findOne({ where: { email: body.email } });
    if (!data) {
      return { success: false, message: 'Client not found' };
    }

    if (!data.password) {
      return { success: false, message: 'Invalid credentials' };
    }

    const isMatch = await bcrypt.compare(body.password, data.password);
    if (!isMatch) {
      return { success: false, message: 'Invalid credentials' };
    }

    // Generate tokens
    let accessToken, refreshToken;
    try {
      ({ accessToken, refreshToken } = generateTokens({
        id: data.clientID,
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
      userID: data.clientID,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error('Login error:', error.message);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};

//client refresh token
export const clientRefreshToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET_ClIENT);
    const { id } = decoded;

    const user = await Client.findByPk(id);
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // Generate new tokens (access & refresh)
    const { accessToken } = generateTokens({ id, role: user.role });

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



//Client forgot password
export const clientForgotPassword = async (email) => {
  try {
    const data = await Client.findOne({ where: { email: email } });
    if (!data) {
      return { success: false, message: 'Client not found' };
    }

    const { accessToken } = generateTokens({ id: data.clientID, role: data.role });
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



export const clientResetPassword = async (token, password, confirmPassword) => {
  try {
    if (password !== confirmPassword) {
      return { success: false, message: 'Passwords do not match' };
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_SECRET_CLIENT);
      console.log('Decoded token:', decoded);
    } catch (error) {
      console.error('Token verification failed:', error);
      return { success: false, message: 'Invalid or expired token' };
    }

    const user = await Client.findByPk(decoded.id);
    if (!user) {
      return { success: false, message: 'Client not found' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    return { success: true, message: 'Password reset successfully' };
  } catch (error) {
    console.error('Error resetting password:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};
