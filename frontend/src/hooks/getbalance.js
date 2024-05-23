import { useEffect, useState } from "react"
import { backend_url } from "../config"
import axios from "axios"
import toast from "react-hot-toast"

export const usegetbalance=()=>{
    const token=localStorage.getItem("token")
    const [balance,setbalance]=useState(0)
    const [loading,setloading]=useState(false)
    async function checkbalance(){
        console.log("enter checkbalance")
        setloading(true)
        const r=await axios.get(`${backend_url}/account/balance`,{
            headers:{
                authorization:'Bearer '+token
            }
        })
        const b=parseInt(r.data.balance)
        
        
        setbalance(b)
        setloading(false)
    }
    
    useEffect(()=>{
        checkbalance()        
        
    },[])
    const addBalance=async(amount)=>{
        console.log("amount : " ,amount)
        try{
            setloading(true)
            
        const response =await axios.put(`${backend_url}/account/add/${amount}`,{
            headers:{
                authorization:'Bearer '+token
            }
        }) 
       
        setloading(false)
        console.log("pass")
        console.log("response ",response)
        if(!response.ok){
            throw new Error
        }
        }catch(error){
            setloading(false)
            console.log(error)
            toast.error("something went wrong")
        }
       }
    return {balance,loading,setloading,addBalance };
}

export  const addBalance=()=>{
    const [balance,setbalance]=useState(0)
    const [loading,setloading]=useState(false)    
}