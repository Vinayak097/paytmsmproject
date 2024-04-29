import React from 'react'

function Transaction() {
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