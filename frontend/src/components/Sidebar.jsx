import React from 'react'

function Sidebar() {
  return (
    <div className='  w-56 bg-white  rounded-lg  shadow h-5/6    flex  justify-center'>
      <div>
        <div className='mt-24 flex flex-col gap-2'>
          <h1 className='px-8 rounded-md cursor-pointer bg-purple-100 py-2 hover:bg-purple-200'>Dashboard</h1>
          <h1 className='px-8 rounded-md cursor-pointer bg-purple-100 py-2 hover:bg-purple-200'>Transactions</h1>
        </div>

        
       </div>

    </div>
  )
}

export default Sidebar