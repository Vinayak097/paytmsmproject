import React from 'react'
import { Appbar } from './Appbar'
import Sidebar from '../components/Sidebar'
import { SendMoney } from './SendMoney'
import { Users } from './Users'

function Home() {
  return (
      <div className='flex  flex-col  h-screen '>
        <Appbar />

        <div className='flex flex-1 gap-2  m-4 mx-10 m-y-b-2   '>
          <div className=''>
            <Sidebar />
          </div >
          <div className='bg-slate-100 h-full w-full '>
            <div className='h-3/6 w-3/6'>
              <Users/>

            </div>
            

          </div>
        </div>  

      </div>
  )
}

export default Home