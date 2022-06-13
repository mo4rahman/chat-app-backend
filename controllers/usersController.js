const User = require("../model/UserModel");
// Encryption of the password using the bcrypt library
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res, next) => {
  try {
    // Destructure
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });

    if (usernameCheck) {
      return res.json({ msg: "Username already exists", status: false });
    }
    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
      return res.json({ msg: "This email is already in use.", status: false });
    }

    // Encrypt our password in database
    // Salt value is the type of encryption
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    // Delete the password once it is encrypted
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    // Destructure
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ msg: "Incorrect username/password", status: false });
    }
    // Compare the password the user tries with the password from the data base, both which are bcrypted
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect username/password", status: false });
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};
