import React from 'react'
import { Appbar } from './Appbar'
import Sidebar from '../components/Sidebar'
import { SendMoney } from './SendMoney'
import { Users } from './Users'
import { Toaster } from 'react-hot-toast'
import { Balance } from './Balance'

import Transaction from './Transaction'
function Home() {
  return (
      <div className='flex  flex-col  h-screen items-center '>
        <Appbar />

        <div className='flex flex-1 min-w-[80%] max-w-[90%] justify-center gap-2  m-4 mx-10 m-y-b-2   '>
          <div className=''>
            <Sidebar />
          </div >
          <div className= 'flex flex-col gap-5 mx-2 h-full w-full '>
            <div className='flex gap-1'>
              <div className=' w-3/6 h-3/6'>
              <Users />

                </div>
                <div className=' '>
                  <div className=''>
                  <Balance></Balance>

                  </div>
                  
                </div>  
            </div>
            <div className='flex-1 flex h-full w-full'>
              <Transaction> </Transaction>
            </div>
          </div>
        </div>  
        <Toaster></Toaster>
      </div>
  )
}

export default Home