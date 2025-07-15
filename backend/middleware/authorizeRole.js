function authorizeRole(role) {
    return (req, res, next) => {
      if (req.user && req.user.role === role) {
        next(); // authorized
      } else {
        res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }
    };
  }
  
  module.exports = authorizeRole;
  