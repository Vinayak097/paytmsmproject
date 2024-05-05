import { usegetbalance } from "../hooks/getbalance"
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../components/Button";
export const Balance = () => {
    
    const {balance,checkbalance}=usegetbalance();
   
   
    
    return <div className="p-2 h-full shadow rounded-lg flex bg-white flex-col">
        <div className="font-bold text-lg text-blue-500">
          balance
        </div>
        <div className="font-semibold  text-lg">
            Rs. {balance} 
        </div>
        <div className="w-24 ">
        <Button  label={"refresh"} onClick={()=>{checkbalance()}}></Button>

        </div>
        
    </div>
}