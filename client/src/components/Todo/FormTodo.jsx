import React from 'react'
import axios from 'axios'


function FormTodo(props) {

  const { setTodos } = props

  const [text, setText] = React.useState({
    title : "",
    description: ""
  });
  const [isErr, setIsErr] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState("")
  
  const onChangeInput = (event) => {
    const { name, value } = event.target
    setText(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const onSubmitInput = async (event) => {
    event.preventDefault()
    if(!text.title || !text.description){
      setErrorMsg("should be text not null");
      return
    }
    const data = {
      title: text.title,
      description: text.description
    }
    try {
      const response = await axios.post('http://localhost:7878/api/todos/create', data)
      console.log(response)
      if(!response.data.data){
        setIsErr(true)
        setErrorMsg(response.data.status.description)
        setText({
          title : "",
          description: ""
        });
        return
      }
      setTodos(prev => [...prev, response.data.data])
    } catch (error) {
      console.log(error)
      setIsErr(true)
      setErrorMsg("something went wrong")
    }

    setText({
      title : "",
      description: ""
    });

    return
  }

  return (
    <div className='mt-8'>
      <form onSubmit={onSubmitInput} className='flex flex-col justify-center items-center'>
        <label className='text-black text-[2em] font-mono font-semibold m-auto p-3'> 
          Enter Title : 
          <input 
            name='title'
            type="text" 
            value={text.title}
            onChange={onChangeInput}/>
        </label>
        <label className='text-black text-[2em] font-mono font-semibold m-auto p-3'> 
          Enter Description : 
        <input 
            name='description'
            type="text" 
            value={text.description}
            onChange={onChangeInput}/>
        </label>
        { errorMsg ? <h1 className='text-red-500'>{errorMsg}</h1> : null}
        <button className='text-2xl bg-red-400' type='submit'>
            Submit Form
        </button>
      </form>
    </div>
  )
}

export default FormTodo