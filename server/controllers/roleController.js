const ApiError = require('../exceptions/ApiError')
const roleService = require('../service/roleService')

class RoleController {
    async createRole(req, res, next) {
        const {value} = req.body
        const role = await roleService.createRole(value);
        return res.json(role);
    }

    async deleteRole(req, res, next) {
        const role = await roleService.deleteRole(req.params.role)
        return res.json(role);
    }

}

module.exports = new RoleController();