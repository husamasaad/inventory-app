const express = require('express')
const router = express.Router()
const producstontroller = require('../controllers/productContoller')
const { authorizeAdmins } = require('../middleware/auth')


router.route('/').get(producstontroller.getAllProducts)

router.use(authorizeAdmins)

router.route('/')
  .post(producstontroller.createNewProduct)

router.route('/:id')
  .patch(producstontroller.updateProduct)
  .delete(producstontroller.deleteProduct)


module.exports = router
