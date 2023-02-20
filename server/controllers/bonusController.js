const bonusService = require('../service/bonusService');
const bonusModel = require('../models/bonusModel');

class BonusController {
    async addBonus(req, res, next) {
        // try {
        //     const {user, task, amount} = req.body;
        //     const bonusData = new taskModel(user, task, amount);
        //     const bonus = await bonusService.addBonus(bonusData);
        //     return res.json(bonus);
        //     // return res.json({task: taskData, status: 'success'});
        // } catch (error) {
        //     console.log(error);
        //     next(error);
        // }
    }

    async getAllBonusesByUserId(req, res, next) {
        try {
            const bonus = await bonusService.getAllBonusesByUserId(req.params.id)
            return res.json(bonus);
            // return res.json({task: taskData, status: 'success'});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getAllBonusesByUserIdForWeek(req, res, next) {
        try {
            const bonuses = await bonusService.getAllBonusesByUserIdForWeek(req.params.id)
            return res.json(bonuses);
            // return res.json({task: taskData, status: 'success'});
        } catch (error) {
            next(error);
        }
    }

    async deleteBonus(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async getBonusByTaskId(req, res, next) {
        try {
            const bonus = await bonusService.getBonusByTaskId(req.params.id)
        } catch (error) {
            
        }
    }

}

module.exports = new BonusController();