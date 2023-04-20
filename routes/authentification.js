const express = require("express")
const router = express.Router()
const { getRegisterPage, getLoginPage, postOnRegisterPage, postOnLoginPage } = require("../controllers/authentification")

router.route("/register").get(getRegisterPage)
router.route("/register").post(postOnRegisterPage)
router.route("/login").get(getLoginPage)
router.route("/login").post(postOnLoginPage)

module.exports = router