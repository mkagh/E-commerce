const Users = require("../model/Users")
const passport = require("passport")

const getRegisterPage = (req, res) => {
    res.render("register")
}
const postOnRegisterPage = async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        console.log("Something is missing...")
        res.render("register")
    }

    if (password.length < 6) {
        console.log("Short password")
        res.render("register")
    }


    try {
        const createUser = await Users.create(req.body)

        res.redirect("/auth/login")
    }

    catch (err) {
        console.log(err)
    }
}
const getLoginPage = (req, res) => {
    res.render("login")
}
const postOnLoginPage = async (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: false
    })(req, res, next);
}

module.exports = { getRegisterPage, getLoginPage, postOnRegisterPage, postOnLoginPage }