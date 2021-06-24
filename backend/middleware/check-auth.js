const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //kigger på min header efter en token og split header siden token er den
    //anden del af string
    const token = req.headers.authorization.split(" ")[1];
    //godkende token
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = {email: decodedToken.email, userId: decodedToken.userId};
    next();
  } catch (error) {
    res.status(401).json({message: "Du har ikke en bruger"});
  }

}
