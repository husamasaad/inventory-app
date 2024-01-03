const express = require('express')
const router = express.Router()
const usersController = require('../controllers/userController')
const { authorizeOwners } = require('../middleware/auth')


router.route('/login').post(usersController.loginUser)

router.route('/').get(usersController.getAllUsers)

router.use(authorizeOwners)

router.route('/').post(usersController.createNewUser)

router.route('/:id')
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser)




module.exports = router
