const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'e5a3b0cfb607ed7e5af4292a147e85b5';

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean()
  if (!users?.length) {
    return res.status(400).json({ message: 'No users found' })
  }
  res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, role, salary, name } = req.body
  // Confirm Data
  if (!username || !password, !role, !salary, !name) {
    return res.status(400).json({ message: 'All Fields are reuired' })
  }
  // Check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec()
  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate username' })
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

  // Create and store new user
  const userObject = {
    username,
    "password": hashedPwd,
    role,
    salary,
    name
  }
  const user = await User.create(userObject)

  if (user) {
    res.status(201).json({ message: `New user : ${username} created`, userObj: user})
  } else {
    res.status(400).json({ message: `Invalid user data recieved`})
  }
})

// @desc Update user
// @route PATHC /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { username, role, salary, name } = req.body
  // Confirm Data
  if (
    !id 
    || !username 
    || !role 
    || !salary 
    || !name
  ) {
      return res.status(400).json({ message: 'All Fields are reuired' })
  }
  const user = await User.findById(id).exec()
  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }
  
  const duplicate = await User.findOne({ username }).lean().exec()
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" })
  }

  user.username = username
  user.name = name
  user.role = role
  user.salary = salary

  const updatedUser = await user.save()

  res.json({ message: `${updatedUser.username} updated`, userObj: updatedUser })

})

// @desc Delete user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  console.log(id)
  if (!id) {
    return res.status(400).json({ message: 'User ID Required' })
  }
  const user = await User.findById(id).exec()
  if (!user) {
    return res.status(400).json({ message: 'User was not found' })
  }
  
  const result = await user.deleteOne()
  const reply = `Username ${result.username} with ID ${result._id} deleted!`
  res.json(reply)
})


// @desc Login User
// @route POST /users/login
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Password and Username are required' })
  }

  const user = await User.findOne({ username }).lean().exec()

  if (!user) {
    return res.status(400).json({ message: 'User was not found' })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Password not Valid' })
  }

  if (user.role !== 'admin' && user.role !== 'owner') {
    return res.status(400).json({ message: 'Only admins and owners are allowed' })
  }

  const token = jwt.sign(
    { userId: user._id, username: user.username, role: user.role },
    secretKey,
    { expiresIn: '12h' }
  );

  res.json({
    message: `${username} logged In Successfully`,
    token: token,
    loggedUser: {
      username: user.username,
      role: user.role,
      name: user.name
    },
  });
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  loginUser
}
