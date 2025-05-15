import HttpStatus from 'http-status-codes';
import * as PolicyService from '../services/policy.service';

//new policy
export const createPolicy = async (req, res, next) => {
  try {
    const data = await PolicyService.createPolicy(req.body);
    if (!data.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: [],
        message: data.messege
      });
    }
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Policy created successfully...'
    });
  } catch (error) {
    next(error);
  }
};