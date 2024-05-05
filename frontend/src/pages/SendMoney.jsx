import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner"
import toast, { Toaster } from "react-hot-toast";

export const SendMoney = () => {
    const [amount,setAmount]=useState(0);
    const navigate=useNavigate();
    const [loading,setloding]=useState(false)
    
    const [searchparams]=useSearchParams();
    
    const id=searchparams.get("id");
    const name=searchparams.get("name");
    const transers=()=>{
        setloding(true)
        fetch("http://localhost:3000/api/v1/account/transfer",{
            method:"POST",headers:{
                    'Content-Type': 'application/json',
                Authorization:"Bearer "+localStorage.getItem("token")
            },
                body:JSON.stringify({
                    to:id,
                    amount:amount
                })  
        })
        .then(async response=>{
            setloding(false)
            const data =await response.json();
            if(response.ok){
                console.log("toasing")
                toast.success("amount transfered")
                setTimeout(() => {
                    navigate("/main")
                }, 300);                 
                               
            }
            else{
                throw new Error(data.message);
            }
        })
        .catch((e)=>{
            setloding(false)
        toast.error(e.message)
            alert("error sendmoney: "+e)});


}

    return <div class="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                class="border h-min text-card-foreground max-w-md p-4 py-16 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div class="flex flex-col space-y-1.5 ">
                <h2 class="text-3xl font-bold text-blue-500 text-center">Send Money</h2>
                </div>
                <div class="px-6 ">
                <div class="flex items-center justify-center space-x-4">
                    <div class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <span class="text-2xl text-white">{name[0].toUpperCase()} </span>
                    </div>
                    <h3 class="text-2xl font-semibold">{name}</h3>
                </div>
                <div class="space-y-4">
                    <div class="space-y-2">
                    <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount"
                    >
                       
                    </label>
                    <input
                        type="number"
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                        onChange={(e)=>{setAmount(e.target.value)}}
                    />
                    </div>
                    <button onClick={async()=> {transers()}} class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        {loading? <Spinner></Spinner> :"Initiate Transfer"}
                    </button>
                    <Toaster></Toaster>
                </div>
                </div>
                
        </div>
      </div>
    </div>
}