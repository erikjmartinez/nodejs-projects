const router = require("express").Router();
const User = require("../model/User");
// For hashing password
var bcrypt = require("bcryptjs");
// For validation of inputs
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  // VALIDATE DATA
  const { error } = registerValidation(req.body);
  //Error check
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check for duplicate account
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // Hash password
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  // Save new user
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.json({ message: err });
  }
});

//Login
router.post("/login", async (req, res) => {
  // Validate data
  const { error } = loginValidation(req.body);
  //Error check
  if (error) return res.status(400).send(error.details[0].message);

  // Check for duplicate account
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exist");

  // Check password
  const validPass = await bcrypt.compareSync(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  res.send("Logged in!");
});

module.exports = router;
