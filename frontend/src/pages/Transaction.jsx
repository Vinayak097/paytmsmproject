import React, { useEffect } from 'react'
import { usegetTransaction } from '../hooks/getTransaction'

function Transaction({recieverId}) {
  const {getTransaction}=usegetTransaction();
  const data=getTransaction(recieverId)
  console.log(data,"data")
  
  console.log();
  return (
    <div className='h-full shadow p-2  bg-white w-full rounded-lg'>
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