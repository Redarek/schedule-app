const bonusService = require('../service/bonusService');
const bonusModel = require('../models/bonusModel');
const { deleteBonus } = require('../service/bonusService');

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
            const bonus = bonusModel.find(user)
            return res.json(bonus);
            // return res.json({task: taskData, status: 'success'});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getAllBonusesByUserIdForWeek(req, res, next) {
        try {
            const bonus = bonusModel.find(user)
            return res.json(bonus);
            // return res.json({task: taskData, status: 'success'});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async deleteBonus(req, res, next) {

    }

    getWeekDay(date) {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return days[date.getDay()]
    }

}

module.exports = new BonusController();