const ApiError = require('../exceptions/ApiError');
const tokenService = require('../service/tokenService');

module.exports = function (roles) {
    return function (req, res, next) {
        if(req.method == "OPTIONS") {
            next()
        }
    
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return next(ApiError.unauthorizedError());
            }
    
            const accessToken = authorizationHeader.split(' ')[1];
            if (!accessToken) {
                return next(ApiError.unauthorizedError());
            }

            const hasRole = tokenService.validateRole(accessToken, roles);
            if (!hasRole) {
                return next(ApiError.unauthorizedError());
            }

            next();
        } catch (e) {
            return next(ApiError.unauthorizedError());
        }
    }
}