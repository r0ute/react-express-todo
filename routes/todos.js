const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.json({todo : "first-in-list"});
}).post('/', function (req, res) {
    res.status(201);
    res.json({ todo: "new todo"});
});

router.route('/:id')
    .put(function (req, res) {
        res.json({todo: "edited todo"});
    }).delete(function (req, res) {
        res.status(204);
        res.end();
});

module.exports = router;