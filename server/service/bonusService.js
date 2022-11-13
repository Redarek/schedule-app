const ApiError = require('../exceptions/ApiError');
const bonusModel = require('../models/bonusModel');
const taskModel = require('../models/taskModel');
// const taskService = require('./taskService');

class BonusService {
    async addBonus(user, task) {
        let amount = 0
        const taskData = await taskModel.findById(task)
        if (taskData.deadlineStatus === 'afterSecond') {
            amount = taskData.penalty
        } else {
            amount = taskData.firstReward;
        }
        const bonus = await bonusModel.create({user: user, task: task, amount: amount}); 
        return bonus;
    }

    async deleteBonus(task) {
        const bonus = await bonusModel.findOneAndDelete({task: task});
        return bonus;
    }

    // async updateBalance(employeeId) {
    //     const tasks = await taskModel.find(employeeId);

    // }
}

module.exports = new BonusService();