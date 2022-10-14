const taskModel = require('../models/taskModel');

class TaskService {

    async createTask(creator, employee, spec, title, text, firstReward, secondReward, penalty, start, firstEnd, secondEnd) {
        // сохраняем таск в БД 
        const task = await taskModel.create({
            creator,
            employee,
            spec,
            title,
            text,
            firstReward,
            secondReward,
            penalty,
            start,
            firstEnd,
            secondEnd}); 
    }
}

module.exports = new TaskService();