import HttpStatus from 'http-status-codes';
import * as AgentService from '../services/agent.service';


export const newAgent = async (req, res, next) => {
  try {
    req.body.role = 'agent';
    const data = await AgentService.newAgent(req.body);
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
      message: 'Agent created successfully...'
    });
  } catch (error) {
    next(error);
  }
}

//login agent
export const agentLogin = async (req, res, next) => {
  try {
    const data = await AgentService.agentLogin(req.body);
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
      message: 'Agent login successfully...'
    });
  } catch (error) {
    next(error);
  }
}

//refresh token
export const refreshToken = async (req, res, next) => {
  try {   
    const Data = await AgentService.agentRefreshToken(req.body.refreshToken);

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


export const agentForgotPassword = async (req, res, next) => {
  try {
    const data = await AgentService.agentForgotPassword(req.body.email);
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
      message: 'Agent forgot password successfully'
    });
  } catch (error) {
    next(error);
  }
} 


export const agentResetPassword = async (req, res, next) => {
  try {
    const data = await AgentService.agentResetPassword(req.body.token, req.body.password, req.body.confirmPassword);
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
      message: 'Agent reset password successfully'
    });
  } catch (error) {
    next(error);
  }
}
