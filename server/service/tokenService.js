const jwt = require('jsonwebtoken');
const tokenModel = require('../models/tokenModel');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1d'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken});
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({refreshToken});
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({refreshToken});
        return tokenData;
    }

    validateRole(token, roles) {
        try {
            const {roles: userRoles} = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            let hasRole = false
            userRoles.forEach(role => {
                if(roles.includes(role)) { //проверяем, содержит ли массив ролей пользователя, хотя бы одну роль, которая разрешена для данной функции
                    hasRole = true
                }
            })
            return hasRole;
        } catch (error) {
            return null;
        }
    }

}

module.exports = new TokenService();