import HttpStatus from 'http-status-codes';

/**
 * Middleware to check if the user has one of the required roles.
 * @param {Array} roles - List of roles that are allowed to access the resource.
 */
export const hasRole = (roles) => {
  return (req, res, next) => {
    console.log("Roles allowed for this route:", roles); 
    console.log("Role in role middleware:", res.locals.role);  

    if (!roles.includes(res.locals.role)) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Access denied.' });
    }
    next();
  };
};