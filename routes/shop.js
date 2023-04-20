const express = require("express")
const router = express.Router()
const { order } = require("../controllers/shop")
router.route("/order").patch(order)

module.exports = router