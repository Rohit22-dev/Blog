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
    console.log(email, password);
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) return res.status(400).json({ message: "User not found" });
    console.log("first");
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    console.log("second");
    delete user.password;
    console.log(user);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
