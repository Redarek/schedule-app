const ApiError = require('../exceptions/ApiError')
const roleService = require('../service/roleService')

class RoleController {
    async createRole(req, res, next) {
        try {
            const {value} = req.body;
            const role = await roleService.createRole(value);
            return res.json(role);
        } catch (error) {
            next(error);
        } 
    }

    async deleteRole(req, res, next) {
        try {
            const role = await roleService.deleteRole(req.params.role);
            return res.json(role);
        } catch (error) {
            next(error);
        }
    }

    async setRole(req, res, next) {
        try {
            const user = await roleService.setRole(req.params.id, req.body);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new RoleController();