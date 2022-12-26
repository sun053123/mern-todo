import React from 'react'
import Header from '../components/Todo/Header'
import Hero from '../components/Todo/Hero'
import FormTodo from '../components/Todo/FormTodo'
import CardTodos from '../components/Todo/CardTodos'
import Footer from '../components/Todo/Footer'

import axios from 'axios';

function Todo() {
  const [todos, setTodos] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState("")

  async function fetchTodos(){
    try {
      const response = await axios.get('http://localhost:7878/api/todos')
      setTodos(response.data.data)
    } catch (error) {
      console.log(error)
      setErrorMsg("something went wrong")
    }
  }
  React.useEffect(()=> {
    fetchTodos()
  }, [])

  console.log(todos)

  return (
    <div className='flex flex-col items-center h-screen bg-slate-300'>
        <Header />
        <Hero />
        <FormTodo setTodos={setTodos} />
        <CardTodos todos={todos} errorMsg={errorMsg} setTodos={setTodos}/>
        <Footer />
    </div>
  )
}

export default Todo