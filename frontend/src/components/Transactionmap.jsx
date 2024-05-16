import React from 'react'


import Transaction from '../pages/Transaction';
import { usegetTransaction } from '../hooks/getTransaction';
function Transactionmap() {
    const {transaction}=usegetTransaction();

 
  return (
    <div>
         <div className=' bg-white rounded-lg w-full h-full overflow-auto'> <p className='mx-2 h-0 text-blue-500 p-2'>Transactions</p>
            <div className='flex justify-between gap-2 text-blue-500 m-2 bg-white h-2  border-b-black p-2'>
            <p>name </p>
           

          
            <p >amount</p>
           
        </div>
        {transaction.length==0?<div className='mx-2 text-grey-500 font-light p-2'> make a transation </div>:<>
          {transaction.map(Tran => <div key={Tran.id} className='overflow'>
                  <Transaction key={Tran.id} name={Tran.recieverId.firstName} amount={Tran.amount}/>
  </div> 
)}</>}
            
            
              
            </div>
        
    </div>
  )
}

export default Transactionmap