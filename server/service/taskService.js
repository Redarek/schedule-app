const taskModel = require('../models/taskModel');
// const bonusService = require('./bonusService');

class TaskService {

    async createTask(taskData) {
        // сохраняем таск в БД 
        const task = await taskModel.create(taskData); 
        return task;
    }

    async getTaskById(id) {
        const task = await taskModel.findById(id);
        return task;
    }

    async getAllTasks() {
        const tasks = await taskModel.find();
        // sort tasks
        return tasks;
    }

    async getAllTasksByEmployeeId(employeeId) {
        const tasks = await taskModel.find(employeeId)

        //ФУНКЦИЯ ПРОТУХАНИЯ ДЕДЛАЙНА
        // const updateTasks = await Promise.all(tasks.map(async function(task) {
        //     const now = new Date();
        //     let start = new Date(task.start);
        //     let firstEnd = new Date(task.firstEnd);
        //     let secondEnd = new Date(task.secondEnd);
        //     let complete = task.complete;
        //     let id = task._id;
        //     let deadlineStatus = task.deadlineStatus;

            // if (!complete) { //обновление статуса дедлайна для получения бонусов
            //     if (secondEnd < now) {
            //         await taskModel.findByIdAndUpdate(id, {deadlineStatus: 'afterSecond', complete: true});
            //         deadlineStatus = 'afterSecond';
            //         await bonusService.addBonus(employeeId.employeeId, id);
            //     } else if (firstEnd < now) {
            //         await taskModel.findByIdAndUpdate(id, {deadlineStatus: 'afterFirst', firstReward: task.secondReward, firstEnd: task.secondEnd});
            //         deadlineStatus = 'afterFirst';
            //         task.firstReward = task.secondReward
            //         task.start = task.secondEnd
            //     } else if (firstEnd > now) {
            //         await taskModel.findByIdAndUpdate(id, {deadlineStatus: 'beforeFirst'});
            //         deadlineStatus = 'beforeFirst';
            //     }
            // }
            // return task;
            
        // }))
        // console.log(updateTasks)
        // return updateTasks;
        return tasks;
    }

    async updateTask(id, taskData) {
        const task = await taskModel.findByIdAndUpdate(id, taskData)
        return task;
    }

    async deleteTask(id) {
        const task = await taskModel.findByIdAndDelete(id);
        return task;
    }
}

module.exports = new TaskService();