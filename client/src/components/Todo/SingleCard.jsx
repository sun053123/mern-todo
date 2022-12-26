import React from 'react'
import axios from 'axios'

function SingleCard({todo, setTodos}) {

    const onClickSetIscomplete = async(e) => {
        e.preventDefault();
        const data = {
            _id: todo._id
        }
        try {
            const response = await axios.patch('http://localhost:7878/api/todos/update/iscomplete', data);
            console.log(response)
            if (response.status.code === 400){
                //error
                console.log(response.data.status.description);
                return
            }
            setTodos((prev) => {
                var newTodos = prev.map((todoObj, _) => {
                    if(todoObj._id === todo._id){
                        return {...todoObj, isComplete: !todo.isComplete}
                    }
                    return {...todoObj}
                })
                return newTodos
            })
            // window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    const onClickDeleteTodo = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:7878/api/todos/delete/${todo._id}`);
            if(!response.data.data){
                console.log(response.data.status.description);
            }
            setTodos((prev) => {
                var newTodos = prev.filter((value, _) => value._id !== todo._id)
                return newTodos
            });
        } catch (error) {
            console.log(error)
        }
        
    }

  return (
    <div className={todo.isComplete ?'relative bg-white shadow-md h-[160px] w-[160px]' : 'relative bg-yellow-200 shadow-md h-[160px] w-[160px]'}>
        <button className='bg-red-600 absolute right-0 text-white'
            onClick={onClickDeleteTodo}>
            X
        </button>
        <div>
            <h1>Title :</h1>
            <h1>{todo.title}</h1>
        </div>
        <div>
            <h1>Description :</h1>
            <h1>{todo.description}</h1>
        </div>
        <button onClick={onClickSetIscomplete} className='bg-green-400'>
            Complete TODO
        </button>
    </div>
  )
}

export default SingleCard