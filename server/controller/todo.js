class Todo {

    constructor(TodoModel){
        this.TodoModel = TodoModel
    }

    // *Path GET /api/todos
    // *Des This path for query all todos
    getAllToodos = async (req, res) => {
        // business
        const todos = await this.TodoModel.find()
    
        const BaseResponseInst = new BaseResponse(200, "success", todos)
        const response = BaseResponseInst.buildResponse()
        return res.json(response).status(200);
    }
    
    // *Path GET /api/todos/:id
    // *Des This path for query single Todo with Id
    getTodoById = (req, res) => {
        // validate
        
        // business
        return 
    }
    
    // *Path POST /api/todos/create
    // *Des This path for make new Todo
    createTodo = async(req, res) => {
    
        const BaseResponseInst = new BaseResponse()
    
        // *Validate
        const { title, description } = req.body;
        console.log(title, description)
        // mandotory
        if(!title || typeof(title) != 'string'){
            BaseResponseInst.setValue(400, "title is invalid", null);
            return res.json(BaseResponseInst.buildResponse()).status(400);
        }
    
        // mandotory
        if(!description || typeof(description) != 'string'){
            BaseResponseInst.setValue(400, "description is invalid", null);
            return res.json(BaseResponseInst.buildResponse()).status(400);
        }
    
        // list of value
        if(title.length <= 5){
            BaseResponseInst.setValue(400, "title lenght should greater than 5", null);
            return res.json(BaseResponseInst.buildResponse()).status(400);
        }
    
        // list of value
        if(description.length <= 10){
            BaseResponseInst.setValue(400, "description lenght should greater than 5", null);
            return res.json(BaseResponseInst.buildResponse()).status(400);
        }
    
        // *Business
        const todo = new this.TodoModel({
            title: title,
            description: description
        });
    
        const todos = await this.TodoModel.create(todo)
    
        BaseResponseInst.setValue(201, "create todo successfully!", todos)
        
        return res.json(BaseResponseInst.buildResponse()).status(201)
    }
    
    // *Path PATCH /api/todos/update
    // *Des This path for make new Todo
    updateTodo = (req, res) => {
        return
    }

    // *Path PATCH /api/todos/update/isComplete
    // *Des This path for switch isComplete
    switchIsComplete = async (req, res) => {
        const buildResponseInst = new BaseResponse()
        // validate
        const { _id } = req.body
        if(!_id){
            buildResponseInst.setValue(400, "invalid input", null)
            return res.json(buildResponseInst.buildResponse).status(400)
        }

        //business
        const Todo = await this.TodoModel.findById(_id)
        Todo.isComplete = !Todo.isComplete

        const NewTodo = await Todo.save();
        return res.json(buildResponseInst.setValue(200, "update isComplete Success", NewTodo)).status(201);
    }

    // *Path DELETE /api/todos/delete/:id
    // *Des This path for delete todo
    deleteTodo = async (req, res) => {

        const buildResponseInst = new BaseResponse()
        const { id } = req.params;
        
        // validate
        if(!id){
            buildResponseInst.setValue(400, "not found id", null)
            return res.json(buildResponseInst.buildResponse()).status(400);
        }

        await this.TodoModel.findOneAndDelete({_id: id});
        buildResponseInst.setValue(204, "delete success", null)
        return res.json(buildResponseInst.buildResponse()).status(204);
        
    }

}

module.exports = Todo

//base response json
// {
//     status: {
//         code: "",
//         description: ""
//     },
//     data: {}
// }

class BaseResponse {

    constructor(code, description, data){
        this.code = code
        this.description = description
        this.data = data

        console.log('running on constructor')
    }

    buildResponse(){
        return {
            status: {
                code: this.code,
                description: this.description,
            },
            data: this.data
        }
    }

    setValue(code, description, data){
        this.code = code
        this.description = description
        this.data = data
    }
}