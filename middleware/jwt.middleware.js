const { expressjwt: jwt } = require("express-jwt");

// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }
  return null;
}
//const jwt = require('jsonwebtoken');

const checkAdmin = (req, res, next) => {
    //const token = req.headers.authorization;
    try {
        //const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (req.payload.isAdmin) {
            next();
        } else {
            return res.status(401).json({ error: 'Unauthorized, User does not have admin rights' });
        }
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized, this is an Admin problem' });
    }
};


// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated, checkAdmin
};
