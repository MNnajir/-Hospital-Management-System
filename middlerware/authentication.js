// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const UnauthenticatedError = require('../Error/unauthenticated');
const  CustomAPIError = require("../Error/custom-error");


// Middleware to authenticate token
exports.authenticateToken = async (req, res,next) => {
  const authHeader = req.headers.authorization;
  //console.log("Authorization Header:" , authHeader)

  if(!authHeader || !authHeader.startsWith('Bearer ')){
      throw new UnauthenticatedError('no token provuded')
  }

  const token = authHeader.split(' ')[1]

    try {
       // console.log("jwt secret:", process.env.JWT_SECRET)
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId: payload.id, role: payload.role} // Attach user info to the request
        //console.log("The decoded user is :", req.user)
        next();
    } catch (error) {
      return next(new UnauthenticatedError('Not authorized to access this route'));
    }
};

// Middleware to authorize roles
exports.authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new CustomAPIError("Access denied. Insufficient permissions!", 403));
        }
        next();
    };
};
