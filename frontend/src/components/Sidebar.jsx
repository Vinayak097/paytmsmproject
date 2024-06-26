import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectSide } from './SelectSide'

function Sidebar() {
  const {select}=useRecoilValue(selectSide)
  console.log("select : ",select)
  return (
    <div className='  w-56 bg-white  rounded-lg  shadow  h-full flex  justify-center'>
      <div>
        <div className='mt-24 flex flex-col gap-2'>
          {select}          
        
          <h1 onClick={()=>{} } className='px-8 rounded-md cursor-pointer bg-blue-100 py-2 hover:bg-blue-300'>Dashboard</h1>
          <h1 onClick={()=>{}} className='px-8 rounded-md cursor-pointer bg-blue-100 py-2 hover:bg-blue-300'>Transactions</h1>
        </div>

        
       </div>

    </div>
  )
}

export default Sidebar