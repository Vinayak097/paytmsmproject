import React from 'react'
import { Appbar } from './Appbar'
import Sidebar from '../components/Sidebar'

import { Users } from './Users'
import { Toaster } from 'react-hot-toast'


import { Balance } from './Balance'

import Transactionmap from '../components/Transactionmap'
import { usegetTransaction } from '../hooks/getTransaction'
function Home() {
  const {transaction}=usegetTransaction();

  console.log("transactoins" ,transaction);
  return (
      <div className='flex  flex-col  h-screen items-center '>
        <Appbar />

        <div className='flex flex-1 min-w-[80%] h-[80%]  max-w-[90%] justify-center gap-2  m-4 mx-10 m-y-b-2   '>
          <div className=''>
          <RecoilRoot> <Sidebar /></RecoilRoot>
           
          </div >
          <div className= 'flex flex-col gap-2 mx-2 h-full w-full '>
            <div className='flex gap-2  h-3/6 '>
              <div className=' w-3/6  bg-white'>
              <Users />
                </div>
                <div className=' flex justify-center items-center bg-white w-3/6 rounded-lg'>
                  <div className=' flex justify-center  items-center'>
                  <Balance></Balance>

                  </div>
                  
                </div>  
            </div>
            <div className='overflow-auto'>
            <Transactionmap></Transactionmap>
            </div>
            
           
          </div>
        </div>  
        <Toaster></Toaster>
      </div>
  )
}

export default Home