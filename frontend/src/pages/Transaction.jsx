import React, { useEffect } from 'react'
import { usegetTransaction } from '../hooks/getTransaction'

function Transaction({recieverId}) {
  const {getTransaction}=usegetTransaction();
  const data=getTransaction(recieverId)
  console.log(data,"data")
  
  console.log();
  return (
    <div className=' shadow p-2 h-full  bg-white rounded-lg'>
        <h1 className='text-blue-500 font-semibold text-lg'>transactions</h1>
        <div className='flex justify-between'>
            <p>transactionname </p>
            <p>amount</p>
            <p>time</p>
        </div>
        
    </div>
  )
}

export default Transaction