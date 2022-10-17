const taskService = require('../service/taskService');
const User = require('../models/userModel');
const Task = require('../models/taskModel');
const userModel = require('../models/userModel');

class TaskController {
    async createTask(req, res, next) {
        try {
            const {employee, spec, title, text, firstReward, secondReward, penalty, start, firstEnd, secondEnd} = req.body;
            const task = new Task({creator: user.id, employee, spec, title, text, firstReward, secondReward, penalty, start, firstEnd, secondEnd})
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