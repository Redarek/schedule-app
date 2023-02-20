const Router = require('express').Router;
const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const bonusController = require('../controllers/bonusController');
const userModel = require('../models/userModel');
const userService = require('../service/userService');
const roleMiddleware = require('../middlewares/roleMiddleware');
const roleController = require('../controllers/roleController');
//user
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration);
router.post('/login',userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/user/:id', authMiddleware, userController.getUserById);
// router.get('/user-by-name', authMiddleware, userController.getUserByName);
router.put('/user/:id', authMiddleware, userController.updateUser);
//task
router.post('/create-task', authMiddleware, taskController.createTask);
router.get('/task/:id', authMiddleware, taskController.getTaskById);
router.get('/tasks', authMiddleware, roleMiddleware(['user']), taskController.getAllTasks);
router.get('/tasks/:employeeId', authMiddleware, taskController.getAllTasksByEmployeeId);
router.put('/task/:id', authMiddleware, taskController.updateTask);
router.delete('/task/:id', authMiddleware, taskController.deleteTask);
router.put('/complete-task/:id', authMiddleware, taskController.completeTask);
// bonus
router.get('/bonuses/:id', authMiddleware, bonusController.getAllBonusesByUserId)
router.get('/bonuses-week/:id', authMiddleware, bonusController.getAllBonusesByUserIdForWeek);
router.get('/bonus-by-task/:id', bonusController.getBonusByTaskId)
// roles
router.post('/role/create', authMiddleware, roleMiddleware(['admin']), roleController.createRole);
router.delete('/role/delete/:role', authMiddleware, roleMiddleware(['admin']), roleController.deleteRole);
router.put('/role/set/:id', authMiddleware, roleMiddleware(['admin']), roleController.setRole);



module.exports = router;
