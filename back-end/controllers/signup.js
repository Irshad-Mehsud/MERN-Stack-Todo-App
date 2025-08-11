import User from "../models/User.js";
import bcrypt from "bcrypt";

const postUser = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const model = await User.create({
      ...req.body,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User created successfully",
      data: model
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ status: 500, error: error.message });
  }
};

export default postUser;
