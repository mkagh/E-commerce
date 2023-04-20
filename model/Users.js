const mongoose = require("mongoose")

const UsersShema = new mongoose.Schema({
    userame: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
    },
    ordered: {
        type: Object,
        default: {}
    },
    totalPrice: {
        type: Number
    },

})

module.exports = mongoose.model("user", UsersShema)