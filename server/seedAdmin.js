const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('Missing MONGODB_URI in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = 'pranithjr@gmail.com';
    const adminData = {
      name: 'admin',
      email: adminEmail,
      password: 'Pranith@123',
      role: 'admin'
    };

    const existingUser = await User.findOne({ email: adminEmail });

    if (existingUser) {
      existingUser.name = adminData.name;
      existingUser.password = adminData.password;
      existingUser.role = adminData.role;
      await existingUser.save();
      console.log(`Updated existing admin user: ${adminEmail}`);
    } else {
      await User.create(adminData);
      console.log(`Created new admin user: ${adminEmail}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error.message);
    process.exit(1);
  }
};

seedAdmin();
