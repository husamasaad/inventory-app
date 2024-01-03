const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'e5a3b0cfb607ed7e5af4292a147e85b5';


const authorizeAdmins = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token.split(' ')[1], secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    // Check if the user has the required role
    if (user.role !== 'admin' && user.role !== 'owner') {
      return res.sendStatus(403); // Forbidden
    }

    req.user = user;
    next();
  });
};

const authorizeOwners = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token.split(' ')[1], secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    // Check if the user has the required role
    if (user.role !== 'owner') {
      return res.sendStatus(403); // Forbidden
    }

    console.log(user)

    req.user = user; // You can now use req.user in your route handler
    next();
  });
};

module.exports = { authorizeAdmins, authorizeOwners};