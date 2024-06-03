import axios from 'axios'
import toast from 'react-hot-toast';
import { useLocalStorage } from './localstorage';
import { useEffect, useState } from 'react';
import { backend_url } from '../config';



export const usegetTransaction=()=>{
    const {getItem}=useLocalStorage()
    const token=getItem;
    const [transaction,setTransactions]=useState([])
    console.log(transaction)
   

     useEffect(()=>{
      const  getTransaction =async()=>{
        console.log("use iefferuiodnfsodfjdls")
      
        try{
        const response=await axios.get(`${backend_url}/account/getTchat`,{
          headers:{
            'Content-Type': 'application/json',
        Authorization:"Bearer "+localStorage.getItem("token")
    }})
    const data=await response.data
    console.log("transaction : before ",response )
    if(data.error){
      throw new Error
    }
    setTransactions(response.data.chat)
        }catch(error){
          toast.error(error.message)
          console.log("errorr : ",error )
        }
        
        
        
  }
  getTransaction()
     },[])

    const getTransactionD=()=>{
      const res=axios.get()

    }
    
    return {transaction}
}

