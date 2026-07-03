const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendEmail, welcomeEmailTemplate } = require('../utils/emailService');

const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePicture: user.profilePicture
    }
  });
};

// @desc    Register user
// @route   POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'An account with this email already exists. Please log in instead.'
      });
    }

    const user = await User.create({ name, email, password, role });

    // Send welcome email (non-blocking)
    sendEmail({
      to: email,
      subject: '🎉 Welcome to AI CareerHub!',
      html: welcomeEmailTemplate(name)
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: 'Please provide email and password' });

    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ success: false, error: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ success: false, error: 'Invalid credentials' });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/update-profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, skills, bio } = req.body;
    const updateData = { name, skills, bio };

    // If profile picture uploaded via Cloudinary
    if (req.file) {
      updateData.profilePicture = req.file.path;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
