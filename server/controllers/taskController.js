const taskService = require('../service/taskService');
const userService = require('../service/userService');
const taskModel = require('../models/taskModel');
const bonusService = require('../service/bonusService');

class TaskController {
    async createTask(req, res, next) {
        try {
            const {employee, categories, title, text, firstReward, secondReward, penalty, start, firstEnd, secondEnd} = req.body;
            const employeeId = await userService.getUserIdByName(req.body.employee);
            const taskData = new taskModel({user: req.user._id, employee, employeeId, categories, title, text, firstReward, secondReward, penalty, start, firstEnd, secondEnd});
            const task = await taskService.createTask(taskData);
            return res.json(task);
            // return res.json({task: taskData, status: 'success'});
        } catch (error) {
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
            // DEV
            // ЦИКЛ СДВИГА ДАТ ДЛЯ ЗАДАЧ 
            // !!!лучше не трогать!!!
            // for (let i = 0; i < tasks.length; i++) {
            //     let day = new Date(tasks[i].start).getDate()
            //     let endDay = new Date(tasks[i].firstEnd).getDate()
            //     if (tasks[i].employee == 'Евгения ' && day != 20 && endDay != 20) {
            //         let strt = tasks[i].start.getTime() + 1000*60*60*3
            //         let endd = tasks[i].firstEnd.getTime() + 1000*60*60*3
            //         console.log(`Задача №${i} ${tasks[i].title} у ${tasks[i].employee} обновлена на \n {${new Date(strt)},\n ${new Date(endd)}}`)
            //         await taskService.updateTask(tasks[i]._id, {
            //             start: strt,
            //             firstEnd: endd
            //         })
            //     }
            // }
            // DEV

            return res.json(tasks);
        } catch (error) {
            next(error);
        }
    }

    async updateTask(req, res, next) {
        try {
            const {employee, categories, title, text, firstReward, secondReward, penalty, start, firstEnd, secondEnd} = req.body;
            const employeeId = await userService.getUserIdByName(req.body.employee);
            const taskData = {user: req.user._id, employee, employeeId, categories, title, text, firstReward, secondReward, penalty, start, firstEnd, secondEnd}
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
            const bonus = await bonusService.deleteBonus(req.params.id) // удаление бонуса за таск
            return res.json(task);
            // return res.json({task, status: 'success'});
        } catch (error) {
            next(error);
        }
    }

    async completeTask(req, res, next) {
        try {
            // let task;
            const candidate = await taskService.getTaskById(req.params.id) //защита от повторного выполнения задачи
            if (!candidate.complete) {
                const task = await taskService.updateTask(req.params.id, {complete: true}) // таск "выполнен"
                const bonus = await bonusService.addBonus(task.employeeId, req.params.id) //получение награды за таск. передаю user и task ID
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
