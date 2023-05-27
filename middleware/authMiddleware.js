const jwt = require("jsonwebtoken");
const {decode} = require("jsonwebtoken");

module.exports = function(req, res, next){
    if(req.method === "OPTIONS"){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        //Authorization: Bearer <token>, цей рядок повертає нам суто токен, без цього заголовку
        if(!token){
            return res.status(401).json({message: "User didn\'t authorised"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        //тепер робимо так, щоб дані з токена були доступний у всіх функціях
        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({message: "User didn\'t authorised"})
    }
};