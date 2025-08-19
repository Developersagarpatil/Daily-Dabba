const express = require('express')
const { addOrder, getMyOrder, updateOrder, getOrder } = require('../controllers/orderController')
const protect = require('../middleware/authmiddleware')

const router = express.Router()

router.get('/:oid',protect, getOrder)
router.get('/all/my-orders',protect, getMyOrder)
router.post('/create-order/:mid',protect, addOrder)
router.put('/:oid',protect, updateOrder)


module.exports = router