const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decode = jwt.verify(token, "secret");
    const user = await User.findOne({ _id: decode._id, "tokens.token": token });

    if (!user) {
      throw new Error();
    }

    //Save the user in req so will not need to fetch user again
    req.user = user;
    req.token = token;

    //things went well, redirect to next middleware
    next();
  } catch(e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
