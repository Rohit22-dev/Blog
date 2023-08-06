import bcrypt from "bcrypt";
import User from "../models/User.js";

//Register User

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: passwordHash });

    const savedUser = await newUser.save();

    res.status(201).json({ savedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Login User

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ error: true, message: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ error: true, message: "Invalid credentials" });

    delete user.password;
    res.status(200).json({ error: false, user: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

//Update user

export const updateProfileImage = async (req, res) => {
  try {
    const { image } = req.body;
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { image } },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

export const updateProfileAbout = async (req, res) => {
  try {
    const { about } = req.body;
    const { userId } = req.params;
    console.log(about, userId);
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { about } },
      { new: true }
    );
    console.log("end about data", user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

// Get all users

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

