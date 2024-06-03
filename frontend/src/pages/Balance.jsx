import { usegetbalance } from "../hooks/getbalance"

import { IoIosAddCircleOutline } from "react-icons/io";
import { Button } from "../components/Button";
import Spinner from "../components/Spinner";
import toast, { Toaster } from "react-hot-toast";




export const Balance = () => {
    
    const {balance,loading,addBalance}=usegetbalance();
    const checkbalance=usegetbalance()
    
   const handler=()=>{
    toast.success("event pending")
    console.log("idocn clided")

   }
   
   
   
    
    return <div className="p-2 h-full shadow rounded-lg flex bg-white flex-col">
        <Toaster></Toaster>
        <div className=" flex items-center gap-3 font-bold text-lg text-blue-500">
          balance  <IoIosAddCircleOutline onClick={()=>{handler}} className="text-xl cursor-pointer hover:bg-blue-500 rounded-full"></IoIosAddCircleOutline>
        </div>
        
        <div className="font-semibold  text-lg">
            Rs. {balance} 
        </div>
        <div className="w-24 ">
        <button type="button" class="bg-indigo-500 ..." disabled>
 
</button>
        <Button  label={loading? <Spinner></Spinner>:"refresh"} onClick={()=>{          
            checkbalance()}}></Button>
        </div>
    </div>
}