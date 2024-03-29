const userService = require('../service/userService');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/ApiError')
const transliter = require('../utils/transliter')

const CLIENT_URL = process.env.NODE_ENV === "production" ? process.env.PROD_CLIENT_URL : process.env.DEV_CLIENT_URL

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password, name} = req.body; //вытаскиваем из тела запроса почту и пароль
            const latinName = transliter(name);
            const userData = await userService.registration(email, password, name, latinName);
            
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true})
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true});
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies; // вытаскиваем рефреш-токен  из куки
            const token = await userService.logout(refreshToken); // передаем рефреш-токен в юзер сервис
            res.clearCookie('refreshToken'); // удаляем рефреш-токен из куки
            return res.json('token');
        } catch (error) {
            next(error);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(CLIENT_URL);
        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true});
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users)
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req, res, next) {
        try {
            const user = await userService.getUserById(req.params.id);
            return res.json(user)
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req, res, next) {
        try {
            const user = await userService.updateUser(req.params.id, req.body)
            return res.json(user)
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
