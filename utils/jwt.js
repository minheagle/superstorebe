import jwt from "jsonwebtoken";

const generateAccessToken = (id, role) => {
  return jwt.sign({ _id: id, role }, process.env.JWT_SECRET, {
    expiresIn: 60,
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
