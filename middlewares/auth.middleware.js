import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import MESSAGE from "../constants/message.js";

const checkAccessToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          status: "FAIL",
          message: MESSAGE.TOKEN.INVALID_TOKEN,
          results: "",
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({
      status: "FAIL",
      message: MESSAGE.TOKEN.NO_TOKEN,
      results: "",
    });
  }
};

const isAdmin = (req, res, next) => {
  const { role } = req.decoded;
  if (role === "admin") {
    return next();
  }
  return res.status(403).json({
    status: "FAIL",
    message: MESSAGE.ROLE.REQUIRED_ROLE,
    results: "",
  });
};

export default { checkAccessToken, isAdmin };
