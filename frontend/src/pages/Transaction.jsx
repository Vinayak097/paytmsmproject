import React from 'react'
import { usegetTransaction } from '../hooks/getTransaction'

function Transaction() {
  const transactions=usegetTransaction();
  console.log(transactions);
  return (
    <div className='h-full bg-white w-full rounded-lg'>
        <h1>transactions</h1>
        <div className='flex gap-2'>
            <p>transactionname </p>
            <p>amount</p>
            <p>time</p>
        </div>
        
    </div>
  )
}

export default Transaction