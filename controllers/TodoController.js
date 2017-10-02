const Todo = require('../models/Todo');
const todoValidator = require('../validators/TodoValidator');

function handleServerError(res, err) {
    res.status(500).json(err);
}

module.exports = {
    findAll: function (req, res) {
        Todo.find({}).exec()
            .then(todos => res.json(todos))
            .catch(err => handleServerError(res, err));

    },
    create: function (req, res) {
        if (!todoValidator.isValid(req, res)) {
            return;
        }

        new Todo(req.body).save()
            .then(todo => res.status(201).json(todo))
            .catch(err => handleServerError(res, err));
    },
    update: function (req, res) {
        if (!todoValidator.isValid(req, res)) {
            return;
        }

        Todo.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).exec()
            .then(todo => {
                if (!todoValidator.exists(req, res, todo)) {
                    return;
                }

                res.json(todo);
            })
            .catch(err => handleServerError(res, err));
    },
    delete: function (req, res) {
        Todo.remove({_id: req.params.id})
            .then((result) => {
                if (!todoValidator.exists(req, res, result)) {
                    return;
                }

                res.json({});
            })
            .catch(err => handleServerError(res, err));
    }
};