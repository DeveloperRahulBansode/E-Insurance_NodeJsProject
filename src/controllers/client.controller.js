import HttpStatus from 'http-status-codes';
import * as ClientService from '../services/client.service';



export const newClient = async (req, res, next) => {
  try {
    const data = await ClientService.newClient(req.body);
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
      message: 'Client created successfully...'
    });
  } catch (error) {
    next(error);
  }
};

//refresh token
export const refreshToken = async (req, res, next) => {
  try {   
    const userData = await ClientService.clientRefreshToken(req.body.refreshToken);

    if (!userData.success) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        data: [],
        message: userData.message || 'Invalid refresh token',
      });
    }

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: {
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken,
      },
      message: 'Tokens generated successfully',
    });
  } catch (error) {
    next(error);
  }
};


export const clientLogin = async (req, res, next) => {
  try {
    const data = await ClientService.clientLogin(req.body);
    if (!data.success) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        data: [],
        message: data.message
      });
    }
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Client logged in successfully...'
    });
  } catch (error) {
    next(error);
  }
}



export const clientForgotPassword = async (req, res, next) => {
  try {
    const data = await ClientService.clientForgotPassword(req.body.email);
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
      message: 'Client forgot password successfully'
    });
  } catch (error) {
    next(error);
  }
} 


export const clientResetPassword = async (req, res, next) => {
  try {
    const data = await ClientService.clientResetPassword(req.body.token, req.body.password, req.body.confirmPassword);
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
      message: 'Client reset password successfully'
    });
  } catch (error) {
    next(error);
  }
}
