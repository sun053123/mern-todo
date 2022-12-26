const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const TodoModel = require('./model/Todo');
const Todo = require('./controller/todo');

dotenv.config()

function bootstrapApp(){
    const PORT = process.env.PORT || '7878'
    const app = express()

    app.use(cors());
    app.use(express.json());

    // connect to mongo
    mongoose.connect(process.env.DB_URL)
    // mongoose.set('strictQuery', false);

    console.log('db connected')

    app.get('/', (_, res) => res.send('server is up!'));

    const todoController = new Todo(TodoModel);
    app.get('/api/todos', todoController.getAllToodos);
    app.get('/api/todos/:id', todoController.getTodoById);
    app.post('/api/todos/create', todoController.createTodo);
    app.patch('/api/todos/update', todoController.updateTodo);
    app.patch('/api/todos/update/iscomplete', todoController.switchIsComplete);
    app.delete('/api/todos/delete/:id', todoController.deleteTodo);

    app.listen(PORT, console.log(`app running at http://localhost:${PORT}`));
}

bootstrapApp();