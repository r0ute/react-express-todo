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

describe('GET /api/todos', function () {
    it('should get list of todos', function (done) {
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

describe('POST /api/todos', function () {
    it('should create new todo item', function (done) {
        const newTodo = {text: 'test'};

        request(app)
            .post('/api/todos')
            .send(newTodo)
            .expect(201)
            .then(function (res) {
                const todo = res.body;

                assert.equal(todo.text, newTodo.text);
                assert.equal(todo.completed, false);

                return done();
            }).catch(function (err) {
            return done(err);
        });
    });

    it('should not create any todo item due to empty text', function (done) {
        request(app)
            .post('/api/todos')
            .send({completed: false})
            .expect(400)
            .then(function (res) {
                assert.ok(res.body.message);

                return done();
            }).catch(function (err) {
            return done(err);
        });
    })
});