const taskService = require('../service/taskService');
const user = require('../models/userModel');
const task = require('../models/taskModel');

class TaskController {
    async createTask(req, res, next) {
        try {
            const {creator, employee, spec, title, text, firstReward, secondReward, penalty, start, firstEnd, secondEnd} = req.body;
            const taskData = await taskService.createTask(creator, employee, spec, title, text, firstReward, secondReward, penalty, start, firstEnd, secondEnd);
            return res.json(taskData);
        } catch (error) {
            next(error);
        }
    }

    async getTasksForDay(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async getTasksForWeek(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async getTasksForMonth(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

    async getTasks(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TaskController();