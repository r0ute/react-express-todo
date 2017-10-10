const express = require('express');
const todoController = require('../controllers/TodoController');
const router = express.Router();

router.route('/todos')
    .get(todoController.findAll)
    .post(todoController.create);

router.route('/todos/:id')
    .patch(todoController.update)
    .delete(todoController.delete);

module.exports = router;