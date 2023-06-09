import jwt from "jsonwebtoken";

const generateAccessToken = (id, role) => {
  return jwt.sign({ _id: id, role }, process.env.JWT_SECRET, {
    expiresIn: "1 days",
  });
};

const generateRefreshToken = (id, role) => {
  return jwt.sign({ _id: id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default {
  generateAccessToken,
  generateRefreshToken,
};
