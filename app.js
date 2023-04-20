require('dotenv').config();
const express = require("express")
const app = express()
const auth = require("./routes/authentification")
const shop = require("./routes/shop")
const connectDB = require('./db/connect');
const notFound = require("./middleware/notFound")
const passport = require("passport")
const session = require("express-session")
require("./config/passport")(passport)
const expressLayouts = require("express-ejs-layouts")

const port = 3000

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(expressLayouts)
app.set("layout", "layouts/layout")
app.set("view engine", "ejs")

app.use("/auth", auth)
app.use("/api/v1", shop)
app.use(notFound)
const start = async () => {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
        console.log(`On this port ${port}`)
    })
}

start()