import axios from 'axios'

import { useEffect, useState } from 'react';




export const usegetTransaction=()=>{
    
    const [transactions,setTransactions]=useState();

    useEffect(()=>{
        fetch("http://localhost:3000/api/v1/account/getTchat",{
    method:"POST",headers:{
        'Content-Type': 'application/json',
    Authorization:"Bearer "+localStorage.getItem("token")
},
    body:JSON.stringify({
        to:id,
        amount:amount
    })
    .then((response)=>{
        const data=JSON.stringify(response);
        setTransactions(data)
        console.log("transaction setled ")
        console.log(data)
    })
    .catch((e)=>{
        console.log("eorror in geting data ")
        toast.error("erro in geting transactions")
        
        console.log(e)
    })
})
        
    },[])
    return {transactions}
}
