import HttpStatus from 'http-status-codes';
import * as AdminService from '../services/admin.service';
import { Admin } from '../models/admin';


export const newAdmin = async (req, res, next) => {
  try {
    req.body.role = 'admin';
    const data = await AdminService.newAdmin(req.body);
    if (!data.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: [],
        message: data.message
      });
    }
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Admin created successfully...'
    });
  } catch (error) {
    next(error);
  }
}

//login agent
export const adminLogin = async (req, res, next) => {
  try {
    const data = await AdminService.adminLogin(req.body);
    if (!data.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: [],
        message: data.message
      });
    }
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Admin login successfully...'
    });
  } catch (error) {
    next(error);
  }
}

//refresh token
export const refreshToken = async (req, res, next) => {
  try {   
    const Data = await AdminService.adminRefreshToken(req.body.refreshToken);

    if (!Data.success) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        data: [],
        message: Data.message || 'Invalid refresh token',
      });
    }

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: {
        accessToken: Data.accessToken,
        refreshToken: Data.refreshToken,
      },
      message: 'Tokens generated successfully',
    });
  } catch (error) {
    next(error);
  }
};


export const adminForgotPassword = async (req, res, next) => {
  try {
    const data = await AdminService.adminForgotPassword(req.body.email);
    if (!data.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: [],
        message: data.message
      });
    }
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Admin forgot password successfully'
    });
  } catch (error) {
    next(error);
  }
} 


export const adminResetPassword = async (req, res, next) => {
  try {
    const data = await AdminService.adminResetPassword(req.body.token, req.body.password, req.body.confirmPassword);
    if (!data.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: [],
        message: data.message
      });
    }
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Admin reset password successfully'
    });
  } catch (error) {
    next(error);
  }
}
