const taskModel = require('../models/taskModel');

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