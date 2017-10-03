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
        new Todo({text: 'test'}).save()
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


describe('PUT /api/todos/:id', function () {
    it('should not update any todo item that does not exist in db', function (done) {
        request(app)
            .put('/api/todos/' + mongoose.Types.ObjectId())
            .send({text: 'test'})
            .expect(404)
            .then(function (res) {
                assert.ok(res.body.message);

                return done();
            }).catch(function (err) {
            return done(err);
        })

    });

    it('should update existing todo item', function (done) {
        new Todo({text: 'test'}).save()
            .then(function (todo) {
                const newText = 'test2';

                return request(app)
                    .put('/api/todos/' + todo._id)
                    .send({text: newText})
                    .expect(200)
                    .then(function (res) {
                        assert.equal(res.body.text, newText);

                        return done();
                    }).catch(function (err) {
                        return done(err);
                    })
            }).catch(function (err) {
            return done(err);
        })
    });
});

describe('DELETE /api/todos/:id', function () {
    it('should not delete any todo item in case it does not exist', function (done) {
        request(app)
            .delete('/api/todos/' + mongoose.Types.ObjectId())
            .expect(404)
            .then(function (res) {
                assert.ok(res.body.message);

                done();
            }).catch(function (err) {
            return done(err);
        })
    });

    it('should delete existing todo item', function (done) {
        new Todo({text: 'test'}).save()
            .then(function (todo) {
                return request(app)
                    .delete('/api/todos/' + todo._id)
                    .expect(200)
                    .then(function (res) {
                        assert.ifError(res.body.message);

                        return done();
                    }).catch(function (err) {
                        return done(err);
                    });
            });
    })
});