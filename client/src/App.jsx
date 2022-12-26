import { useState } from 'react'
import Navbar from './components/Navbar'
import Todo from './pages/Todo'
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Todo />} />
      </Routes>
    </>
  )
}

export default App
