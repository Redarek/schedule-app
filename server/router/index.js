const Router = require('express').Router;
const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const transactionController = require('../controllers/transactionController');
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
//task
router.post('/create-task', authMiddleware, taskController.createTask);
router.get('/task/:id', authMiddleware, taskController.getTaskById);
router.get('/tasks', authMiddleware, taskController.getAllTasks);
router.put('/task/:id', authMiddleware, taskController.updateTask);
router.delete('/task/:id', authMiddleware, taskController.deleteTask);
//transaction
router.post('/task/:id/complete', authMiddleware, transactionController.completeTask);
router.get('/user/transactions', authMiddleware, transactionController.getTransactionsByUserId)

module.exports = router;