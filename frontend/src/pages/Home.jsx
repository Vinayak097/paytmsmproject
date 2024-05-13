import React from 'react'
import { Appbar } from './Appbar'
import Sidebar from '../components/Sidebar'
import { SendMoney } from './SendMoney'
import { Users } from './Users'
import { Toaster } from 'react-hot-toast'

import { Balance } from './Balance'

import Transaction from './Transaction'
import { usegetTransaction } from '../hooks/getTransaction'
function Home() {
  const {transaction}=usegetTransaction();

  console.log("transactoins" ,transaction);
  return (
      <div className='flex  flex-col  h-screen items-center '>
        <Appbar />

        <div className='flex flex-1 min-w-[80%] h-[80%]  max-w-[90%] justify-center gap-2  m-4 mx-10 m-y-b-2   '>
          <div className=''>
            <Sidebar />
          </div >
          <div className= 'flex flex-col gap-2 mx-2 h-full w-full '>
            <div className='flex gap-2  h-3/6 '>
              <div className=' w-3/6 '>
              <Users />

                </div>
                <div className=' flex justify-center items-center bg-white w-3/6 rounded-lg'>
                  <div className=' flex justify-center  items-center'>
                  <Balance></Balance>

                  </div>
                  
                </div>  
            </div>
            <div className=' bg-white rounded-lg w-full h-full overflow-auto'> <p className='mx-2 h-0 text-blue-500 p-2'>Transactions</p>
            <div className='flex justify-between gap-2 text-blue-500 m-2 bg-white h-2  border-b-black p-2'>
            <p>name </p>
           

          
            <p >amount</p>
           
        </div>
          {transaction.length==0?<div className='mx-2 text-grey-500 font-light p-2'> make a transation </div>:<>
          {transaction.map(Tran => <div key={Tran.id} className='overflow'>
                  <Transaction name={Tran.recieverId.firstName} amount={Tran.amount}/>
  </div> 
)}</>}
            
            
              
            </div>
          </div>
        </div>  
        <Toaster></Toaster>
      </div>
  )
}

export default Home