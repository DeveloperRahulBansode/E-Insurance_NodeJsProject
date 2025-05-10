import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Authorization token is required',
      });
    }
    const token = bearerToken.split(' ')[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_SECRET_ADMIN);
    } catch (adminError) {
      try {
        decoded = jwt.verify(token, process.env.ACCESS_SECRET_CLIENT);
      } catch (clientError) {
        try {
          decoded = jwt.verify(token, process.env.ACCESS_SECRET_AGENT);
        }catch (agentError) {
          return res.status(HttpStatus.UNAUTHORIZED).json({
            message: 'Invalid token',
          });
        }
      }
    }
    console.log('Decoded token:', decoded);

    // Store the decoded user and role in the response locals
    res.locals.user = decoded;
    res.locals.token = token;
    res.locals.role = decoded.role;

    console.log('Authorization is successful....');
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Authentication failed' });
  }
};
