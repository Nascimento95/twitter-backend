
const verifyUser = (req, res, next) => {
    console.log(req.user,"mon req user biaych");
    if (!req.user) {
        res.status(404).json({error: "aunotorized"})
    } else {
        next()
    }
}

module.exports = {
    verifyUser
}