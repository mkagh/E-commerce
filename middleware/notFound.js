const notFound = (req, res) => {
    res.status(404).send("Wrong page...")
}

module.exports = notFound