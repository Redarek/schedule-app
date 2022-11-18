const roleModel = require('../models/roleModel')
const userModel = require('../models/userModel')
const ApiError = require('../exceptions/ApiError');

class RoleService {
    async createRole(roleName) {
        const role = await roleModel.create({value: roleName}); 
        return role;
    }

    async deleteRole(roleName) {
        const role = await roleModel.findOneAndDelete({value: roleName});
        return role;
    }

    async setRole(id, roles) {
        const allRoles = await roleModel.find();
        let arrRoles = []
        allRoles.forEach(el => arrRoles.push(el.value))
        let hasRole = true
        roles.roles.forEach(role => {
            if(!arrRoles.includes(role)) { //проверяем, содержит ли массив ролей пользователя, хотя бы одну роль, которая разрешена для данной функции
                hasRole = false
            }
        })
        if (!hasRole) {
            throw ApiError.badRequest('Несуществующая роль');
        }
        const user = await userModel.findByIdAndUpdate(id, roles)
        return user
    }
}

module.exports = new RoleService();