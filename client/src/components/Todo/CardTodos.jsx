import React from 'react'
import SingleCard from './SingleCard'

function CardTodos(props) {
  const { todos, setTodos } = props
  
  return (
    <div className='flex justify-center items-center'>
      <div className='grid grid-cols-3 gap-2'>
      {todos.length > 0 ? todos.map((todo, index) => {
        return <div key={index} >
          <SingleCard todo={todo} setTodos={setTodos}/>
        </div>
      }) : null}
      </div>
    </div>
  )
}

export default CardTodos