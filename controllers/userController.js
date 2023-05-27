const ApiError = require("../error/ApiError");
const {User} = require("../models/models");
const {Role} = require("../models/models");
const UserService = require('../services/userService')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController{
    async registration(req, res, next) {
        const { email, password, role } = req.body;
        try {
            const token = await UserService.registration(email, password, role);
            return res.json({ token });
        } catch (error) {
            return next(error);
        }
    }
    async login(req, res, next){
        const{email, password} = req.body
        try {
            const token = await UserService.login(email, password);
            return res.json({token})
        } catch (error) {
            return next(error);
        }
    }
    async check(req, res, next){
        const { id, email, role } = req.user;
        try{
            const token = await UserService.check(id, email, role);
            return res.json({token})
        } catch (error) {
            return next(error);
        }
    }
    async getUsers(req, res) {
        try {
            const users = await UserService.getUsers();
            if (!users) {
                return res.status(500).json({ message: "Internal server error" });
            }
            return res.json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new UserController()