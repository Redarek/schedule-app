const roleModel = require('../models/roleModel')

class RoleService {
    async createRole(roleName) {
        const role = await roleModel.create({value: roleName}); 
        return role;
    }

    async deleteRole(roleName) {
        const role = await roleModel.findOneAndDelete({value: roleName});
        return role;
    }
}

module.exports = new RoleService();