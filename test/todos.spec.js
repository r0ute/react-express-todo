const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
mongoose.Promise = require('bluebird');
const assert = require('assert');

const Todo = require('../models/Todo');
const app = require('../app');
const request = require('supertest');

before(function (done) {
    mockgoose.prepareStorage().then(function () {
        mongoose.connect('mongodb://localhost/testdb', {useMongoClient: true}, function (err) {
            done(err);
        });
    });
});

describe('GET /api/todo', function () {
    it("should get list of todos", function (done) {
        const todo = {text: 'test'};

        new Todo(todo).save()
            .then(function (todo) {
                return request(app)
                    .get('/api/todos')
                    .expect(200)
                    .then(function (res) {
                        const todos = res.body;

                        assert.equal(todos.length, 1)
                        assert.equal(todos[0].text, todo.text);
                        assert.equal(todos[0].completed, false);

                        return done();
                    }).catch(function (err) {
                        return done(err);
                    });
            });
    });
});