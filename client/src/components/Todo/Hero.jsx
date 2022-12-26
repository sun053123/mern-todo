import React from 'react'
import TodoLogoPNG from '../../assets/to-do-list.png'

function Hero() {
  return (
    <div className='relative'>
      <img src={TodoLogoPNG} className='h-[120px] w-[120px]'/>
    </div>
  )
}

export default Hero