const accessControl = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control-ALlow-Headers", "content-type, x-auth-token")
    next()
}


module.exports = accessControl;