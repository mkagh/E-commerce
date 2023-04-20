const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const Users = require("../model/Users")

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            Users.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        done(null, false, { msg: "There is no user with this data" })
                    }
                    if (password === user.password) {
                        done(null, user)
                    }
                    else {
                        done(null, false, { msg: "wrong password" })
                    }
                })
        })
    )
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        Users.findById(id)
            .exec()
            .then(user => {
                done(null, user);
            })
            .catch(err => {
                done(err);
            });
    });;
}