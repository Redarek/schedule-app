const taskService = require('../service/taskService');
const userService = require('../service/userService');
const taskModel = require('../models/taskModel');
const bonusService = require('../service/bonusService');

class TaskController {
    async createTask(req, res, next) {
        try {
            const {employee, spec, title, text, firstReward, secondReward, penalty, start, firstEnd, secondEnd} = req.body;
            const employeeId = await userService.getUserIdByName(req.body.employee);
            const taskData = new taskModel({user: req.user._id, employee, employeeId, spec, title, text, firstReward, secondReward, penalty, start, firstEnd, secondEnd});
            const task = await taskService.createTask(taskData);
            return res.json(task);
            // return res.json({task: taskData, status: 'success'});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getTaskById(req, res, next) {
        try {
            const task = await taskService.getTaskById(req.params.id)
            return res.json(task);
            // return res.json({task, status: 'success'});
        } catch (error) {
            next(error);
        }
    }

    async getAllTasks(req, res, next) {
        try {
            const tasks = await taskService.getAllTasks();
            return res.json(tasks);
            // return res.json({tasks, status: 'success'});
        } catch (error) {
            next(error);
        }
    }

    async getAllTasksByEmployeeId(req, res, next) {
        try {
            const tasks = await taskService.getAllTasksByEmployeeId({employeeId: req.params.employeeId});
            return res.json(tasks);
        } catch (error) {
            next(error);
        }
    }

    async updateTask(req, res, next) {
        try {
            const {employee, spec, title, text, firstReward, secondReward, penalty, start, firstEnd, secondEnd} = req.body;
            const employeeId = await userService.getUserIdByName(req.body.employee);
            const taskData = {user: req.user._id, employee, employeeId, spec, title, text, firstReward, secondReward, penalty, start, firstEnd, secondEnd}
            const task = await taskService.updateTask(req.params.id, taskData)
            return res.json(task);
            // return res.json({task, status: 'success'});
        } catch (error) {
            next(error);
        }
    }

    async deleteTask(req, res, next) {
        try {
            const task = await taskService.deleteTask(req.params.id)
            return res.json(task);
            // return res.json({task, status: 'success'});
        } catch (error) {
            next(error);
        }
    }

    async completeTask(req, res, next) {
        try {
            // let task;
            const candidate = await taskService.getTaskById(req.params.id)
            console.log()
            console.log(candidate.complete)
            if (!candidate.complete) {
                const task = await taskService.updateTask(req.params.id, {complete: true}) // таск "выполнен"
                const bonus = await bonusService.addBonus(req.user._id, req.params.id) //получение награды за таск. передаю user и task ID
                return res.json(task);
            } else {
                const task = await taskService.updateTask(req.params.id, {complete: false}) // отмена "выполнено" у таска
                const bonus = await bonusService.deleteBonus(req.params.id) // удаление бонуса за таск
                return res.json(task);
            }
            // return res.json({task, status: 'success'});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TaskController();
