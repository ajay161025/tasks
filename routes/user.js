import express from "express";
const router = express.Router();

import { userResgister, userlogin } from "../controllers/userinfo.js";

// user register
router.post("/register", userResgister);

//user login
router.post("/login", userlogin);

router.get("/logout", async (req, res) => {
  res
    .status(200)
    .clearCookie("logincookie", {
      httpOnly: true,
      path: "/",
      secure: false,
      maxAge: 0,
    })
    .json({ message: "logged out" });
});

export default router;
