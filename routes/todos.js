const express = require('express');
const todoController = require('../controllers/TodoController');
const router = express.Router();

router.route('/')
    .get(todoController.findAll)
    .post(todoController.create);

router.route('/:id')
    .put(todoController.update)
    .delete(todoController.delete);

module.exports = router;