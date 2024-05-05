import React from 'react'
import { Appbar } from './Appbar'
import Sidebar from '../components/Sidebar'
import { SendMoney } from './SendMoney'
import { Users } from './Users'
import { Toaster } from 'react-hot-toast'


import Transaction from './Transaction'
import { Balance } from './Balance'
function Home() {
  return (
      <div className='flex  flex-col  h-screen items-center '>
        <Appbar />

        <div className='flex flex-1  min-w-[80%] max-w-[90%] justify-center gap-2  m-4 mx-10 m-y-b-2   '>
          <div className=''>
            <Sidebar />
          </div >
          <div className= 'flex flex-col gap-2 mx-2 h-full w-full '>
            <div className='flex  gap-4 h-3/6'> 
                <div className=' w-3/6'>
                    <Users />

                  </div>
                <div className='flex-1 '>
                <Balance></Balance>
                </div>
            </div>
            <div className='w-full flex-1 h-full'>
              <div className='w-full h-full'>
              <Transaction recieverId={"662e15cd17d90c3f5f77a74a"}></Transaction>
               
                
              </div>

            </div>
            
          </div>
        </div>  
        <Toaster></Toaster>

      </div>
  )
}

export default Home