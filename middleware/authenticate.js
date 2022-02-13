const jwt = require("jsonwebtoken");
const {User} = require("../models");
const {SECRET_KEY} = process.env;
const {Unauthorized} = require("http-errors");



const authenticate = async (req, res, next) => {
    try {
        const {authorization} = req.headers;
        if(!authorization){
            throw new Unauthorized("Not authorized");
        }
        const [bearer, token] = authorization.split(' '); // разделяем authorization на массив и проверяем является ли первым слово bearer
        if(bearer !== 'Bearer'){
            throw new Unauthorized("Not authorized");
        }

            jwt.verify(token, SECRET_KEY);
            const user = await User.findOne({token});
            if(!user){
                throw new Unauthorized("Not authorized");
            }
            req.user = user;
            next();
       
    } catch (error) {
        if(!error.status){
            error.status = 401;
            error.message = "Not authorized"
        }
        next(error);
    }


 
}

module.exports = authenticate; 