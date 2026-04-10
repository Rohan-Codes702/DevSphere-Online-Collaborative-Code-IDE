const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const projectModel = require('../models/projectModel');

const router = express.Router();
const secret = process.env.JWT_SECRET || 'secret';

// --- AUTH ROUTES ---

router.post('/signup', async (req, res) => {
  const { username, name, email, password } = req.body;

  if (!username || !name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      username,
      name,
      email,
      password: hash,
    });

    return res.status(201).json({ success: true, message: 'User created successfully', userId: user._id });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ success: false, message: 'Error creating user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ email: user.email, userId: user._id }, secret, { expiresIn: '7d' });
    return res.status(200).json({ success: true, message: 'User logged in successfully', token, userId: user._id });
    
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Error logging in' });
  }
});

router.post('/getUserDetails', async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  try {
    const user = await userModel.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, message: 'User details fetched successfully', user });
  } catch (err) {
    console.error('getUserDetails error:', err);
    return res.status(500).json({ success: false, message: 'Error fetching user details' });
  }
});

// --- PROJECT ROUTES ---

router.post('/createProject', async (req, res) => {
  const { userId, title } = req.body;

  if (!userId || !title) {
    return res.status(400).json({ success: false, message: 'User ID and title are required' });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const project = await projectModel.create({ title, createdBy: userId });
    return res.status(201).json({ success: true, message: 'Project created successfully', projectId: project._id });
  } catch (err) {
    console.error('createProject error:', err);
    return res.status(500).json({ success: false, message: 'Error creating project' });
  }
});

router.post('/getProjects', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  try {
    const projects = await projectModel.find({ createdBy: userId });
    return res.status(200).json({ success: true, message: 'Projects fetched successfully', projects });
  } catch (err) {
    console.error('getProjects error:', err);
    return res.status(500).json({ success: false, message: 'Error fetching projects' });
  }
});

router.post('/deleteProject', async (req, res) => {
  const { userId, progId } = req.body;

  if (!userId || !progId) {
    return res.status(400).json({ success: false, message: 'User ID and project ID are required' });
  }

  try {
    const project = await projectModel.findOneAndDelete({ _id: progId, createdBy: userId });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found or not owned by user' });
    }

    return res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    console.error('deleteProject error:', err);
    return res.status(500).json({ success: false, message: 'Error deleting project' });
  }
});

router.post('/getProject', async (req, res) => {
  const { userId, projId } = req.body;

  if (!userId || !projId) {
    return res.status(400).json({ success: false, message: 'User ID and project ID are required' });
  }

  try {
    const project = await projectModel.findOne({ _id: projId, createdBy: userId });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    return res.status(200).json({ success: true, message: 'Project fetched successfully', project });
  } catch (err) {
    console.error('getProject error:', err);
    return res.status(500).json({ success: false, message: 'Error fetching project' });
  }
});

router.post('/updateProject', async (req, res) => {
  const { userId, htmlCode, cssCode, jsCode, projId } = req.body;

  if (!userId || !projId) {
    return res.status(400).json({ success: false, message: 'User ID and project ID are required' });
  }

  try {
    const project = await projectModel.findOneAndUpdate(
      { _id: projId, createdBy: userId },
      { htmlCode, cssCode, jsCode },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found or not owned by user' });
    }

    return res.status(200).json({ success: true, message: 'Project updated successfully', project });
  } catch (err) {
    console.error('updateProject error:', err);
    return res.status(500).json({ success: false, message: 'Error updating project' });
  }
});

module.exports = router;