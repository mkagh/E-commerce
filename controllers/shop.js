const Users = require("../model/Users")


const order = async (req, res) => {

    const user = await Users.findOneAndUpdate(
        { email: req.user.email },
        req.body,
        { new: true, runValidators: true }
    )
    console.log(user)
    if (!user) {
        console.log("Tehere is no user with this email")
    }
    res.status(201).json({ user })
}

module.exports = { order }