const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    title : {
        type: String,
        require: true,
    },
    description : {
        type: String,
        require: true
    },
    isComplete : {
        type : Boolean,
        require: true,
        default: false
    },
    createdAt : {
        type: Date,
        require: true,
        default: Date.now()
    },
});

const TodoModel = mongoose.model("todo", TodoSchema)

module.exports = TodoModel;