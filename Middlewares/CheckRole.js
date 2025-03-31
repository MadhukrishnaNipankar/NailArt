exports.checkRole = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Assuming the user's role is stored in `req.user.role` (set after authentication)
      const userRole = req.user.role;

      if (!userRole) {
        return res.status(403).json({
          status: "fail",
          data: null,
          message: "User role not found. Access denied.",
        });
      }

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          status: "fail",
          data: null,
          message: "You do not have permission to perform this operation.",
        });
      }

      next(); // User has the required role, proceed to the next middleware or controller
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        data: null,
        message: "An error occurred while checking user roles.",
        exception: error.message,
      });
    }
  };
};
