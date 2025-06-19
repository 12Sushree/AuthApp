const User = require("../model/userModel");
const Otp = require("../model/otpModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: sendVerificationEmail } = require("../utils/sendMail");

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(300).json({
        success: false,
        message: "All Fields are Required!",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Existing, Please Try Login!",
      });
    }

    const otpValue = Math.floor(100000 + Math.random() * 900000);

    const existingOtp = await Otp.findOne({ email });

    if (existingOtp) {
      existingOtp.otp = otpValue;
      await existingOtp.save();
      await sendVerificationEmail(existingOtp.email, otpValue);
    } else {
      const otpCreation = await Otp.create({
        email,
        otp: otpValue,
      });
      await sendVerificationEmail(email, otpValue);
    }

    return res.status(200).json({
      success: true,
      message: "OTP Sent Successfully!",
      otp: otpValue,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    const { firstName, middleName, lastName, email, password, role, otp } =
      req.body;

    if (!firstName || !lastName || !email || !password || !role || !otp) {
      return res.status(300).json({
        success: false,
        message: "All Fields are Required!",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Existing, Please Try Login!",
      });
    }

    const findOtp = await Otp.findOne({ email });

    if (!findOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP does not Exists!",
      });
    }

    if (findOtp.otp != otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is Incorrect!",
      });
    }

    const hassedPassword = await bcrypt.hash(password, 10);

    const createUser = new User({
      firstName,
      middleName,
      lastName,
      email,
      password: hassedPassword,
      role,
    });
    await createUser.save();

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(300).json({
        success: false,
        message: "All Fields are Required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(300).json({
        success: false,
        message: "User does not Exists, Try SignUp!",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(200).json({
        success: false,
        message: "Password is Incorrect",
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
      token,
      role: user.role,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const decode = req.decode;

    const userDetails = await User.findOne({ _id: decode.userId });

    return res.status(200).json({
      success: true,
      message: "User Data Retrieved Successfully",
      userDetails,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
