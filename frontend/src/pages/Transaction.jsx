import React, { useEffect } from 'react'
import { usegetTransaction } from '../hooks/getTransaction'

function Transaction({key,name,amount }) {
  
  return (
    <div key={key} className='  bg-white shadow rounded-lg  '>
      
        <div className='flex justify-between gap-2  m-2 bg-white  border-b-black p-2'>
            <p>{name ||""} </p>
            

          
            <p>{amount ||""}</p>
           
        </div>
        
    </div>
  )
}

export default Transaction