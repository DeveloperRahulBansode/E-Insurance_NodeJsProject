import HttpStatus from 'http-status-codes';
import * as ClientService from '../services/agent.service';


export const newAgent = async (req, res, next) => {
  try {
    req.body.role = 'agent';
    const data = await ClientService.newAgent(req.body);
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