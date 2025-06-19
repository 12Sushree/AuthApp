const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    const headerData = req.headers.authorization;
    try {
        if(headerData){
            const token = headerData.split(" ")[1];
            const decode = jwt.decode(token, process.env.JWT_SECRET_KEY);
            req.decode = decode;
            next();
        }
        else {
            return res.status(401).json({
                success: false,
                message: "No Token Found"
            })
        }
    }
    catch (e) {
        return res.status(401).json({
            success: false,
            message: "Token is invalid"
        })
    }
}