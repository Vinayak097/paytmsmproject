import React from 'react'
import { useNavigate } from 'react-router-dom'

function PayButton() {
    const navigate=useNavigate()
    const handle=()=>{
        navigate("/send");
    }
  return (
    <button className='bg-green-400 p-2 rounded-lg' onClick={()=>{handle}}>pay</button>
  )
}

export default PayButton