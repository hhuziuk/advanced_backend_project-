// user service
const ApiError = require("../error/ApiError");
const {User} = require("../models/models");
const {Role} = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateJWT(id, email, role, time){
    return jwt.sign({id, email, role}, process.env.JWT_SECRET_KEY, { expiresIn: `${time}h`})
}

class UserService{
    async registration(email, password, role){
        if (!email || !password) {
            throw ApiError.badRequest("Incorrect email or password");
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            throw ApiError.badRequest("User already exists");
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const userRole = await Role.findOne({value: "USER"})
        const user = await User.create({email, role, password: hashPassword})
        const token = generateJWT(user.id, user.email, user.role, 1)
        return token
    }
    async login(email, password){
        const user = await User.findOne({where: {email}})
        if(!user){
            throw ApiError.internal("User doesn't exist");
        }
        //перший пароль - пароль юзера, другий пароль - пароль з бд
        let comparePasswords = await bcrypt.compareSync(password, user.password)
        if(!comparePasswords){
            throw ApiError.internal('Wrong password')
        }
        const token = generateJWT(user.id, user.email, user.role, 1)
        return token
    }
    async check(id, email, role){
        const token = generateJWT(id, email, role, 1)
        return token
    }

    async getUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

module.exports = new UserService()