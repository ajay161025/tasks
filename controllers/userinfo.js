import userModel from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// jwt
export const authentication = async (req, res, next) => {
  const authHeader = req.headers.cookie;
  if (!authHeader || authHeader == null || authHeader === undefined) {
    if (!token) return res.status(401).json({ message: "Token expired" });
  }

  const token = authHeader.split("=")[1];
  if (!token) return res.status(401).json({ message: "Token expired" });

  const decode = jwt.verify(token, "secret");
  if (!decode) {
    return res.status(404).json({ message: "Token expired" });
  }
  const user = await userModel.findById(decode.userId);
  if (!user) {
    return res.status(404).json({ message: "Token expired" });
  }
  req.ajay = user;

  next();
};

// resgiter
const userResgister = async (req, res) => {
  const { username, password } = req.body;

  if (
    username.length < 3 ||
    username.length > 15 ||
    username === "" ||
    typeof username !== "string"
  ) {
    return res
      .status(500)
      .json({ message: "username should be 3  to 15 letters" });
  }
  if (
    password.length <= 5 ||
    password.length > 20 ||
    password === "" ||
    typeof password !== "string"
  ) {
    return res
      .status(500)
      .json({ message: "password should be 5 to 20 letters " });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await userModel.create({
      username: req.body.username,
      password: hashedPassword,
    });
    res.status(200).json(user);
    // const { password, ...other } = user._doc
    // res.status(200).json(other)
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// login
const userlogin = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.body.username })
    
    if (!user)
      return res.status(403).json({ "message ": "username is not found" });
    const validPassword = bcrypt.compare(req.body.username, user.password);
    if (!validPassword)
      return res.status(400).json({ "message ": " password incorrect" });

    // if (!user)
    //   return res.status(403).json({ "message ": "username is not found" });

    const accessToken = jwt.sign({ userId: user.id }, "secret", {
      expiresIn: "7d",
    });

    res.status(200).cookie("logincookie", accessToken, {
      httpOnly: true,
      path: "/",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
};

export { userResgister, userlogin };
