const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mailService');
const tokenService = require('./tokenService');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/ApiError');
const roleModel = require('../models/roleModel');
const API_URL = process.env.NODE_ENV === "production" ? 'https://pointsystem.rushools.ru/api' : 'http://localhost:8080/api';
class UserService {
    async registration(email, password, name, latinName) {
        const candidateEmail = await userModel.findOne({email});
        // Проверяем, есть ли email в БД
        if (candidateEmail) {
            throw ApiError.badRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }

        const candidateName = await userModel.findOne({name});
        const candidateLatinName = await userModel.findOne({latinName});
        // Проверяем, есть ли name в БД
        if (candidateName || candidateLatinName) {
            throw ApiError.badRequest(`Пользователь с именем ${name} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 3); //хэшируем пароль
        const activationLink = uuid.v4(); // генерация ссылки активации для письма на email

        const user = await userModel.create({email, password: hashPassword, activationLink, name, latinName}); // сохраняем польз-ля в БД
        await mailService.sendActivationMail(email, `${API_URL}/activate/${activationLink}`);

        const userDto = new UserDto(user); //передаём все данные о пользователе в DTO (Data Transfer Object) dto получаем на клиенте и dto нужен для отправки email письма
        const tokens = tokenService.generateTokens({...userDto}); // генерируем JWT токены
        await tokenService.saveToken(userDto.id, tokens.refreshToken); // сохраняем рефреш токен в БД

        // возвращаем инфу о польз-ле и токены
        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink) {
        const user = await userModel.findOne({activationLink});
        if (!user) {
            throw ApiError.badRequest('Некорректная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await userModel.findOne({email});
        if (!user) {
            throw ApiError.badRequest('Пользователь с таким email не найден')
        }

        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals) {
            throw ApiError.badRequest('Неверный пароль')
        }
        const userDto = new UserDto(user); //генерируем dto, выбрасываем из модели всё ненужное
        const tokens = tokenService.generateTokens({...userDto}); // генерируем JWT токены
        await tokenService.saveToken(userDto.id, tokens.refreshToken); // сохраняем рефреш токен в БД

        // возвращаем инфу о польз-ле и токены
        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.unauthorizedError();
        }
        const user = await userModel.findById(userData._id)
        // код ниже можно вынести в отдельную функцию
        const userDto = new UserDto(user); //генерируем dto, выбрасываем из модели всё ненужное
        const tokens = tokenService.generateTokens({...userDto}); // генерируем JWT токены
        await tokenService.saveToken(userDto._id, tokens.refreshToken); // сохраняем рефреш токен в БД

        // возвращаем инфу о польз-ле и токены
        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await userModel.find();
        return users;
    }

    async getUserById(id) {
        const user = await userModel.findById(id);
        return user;
    }

    async getUserIdByName(name) {
        const user = await userModel.findOne({name});
        return user.id;
    }

    async updateUser(id, userData) {
        const user = await userModel.findByIdAndUpdate(id, userData)
        return user;
    }
}

module.exports = new UserService();
