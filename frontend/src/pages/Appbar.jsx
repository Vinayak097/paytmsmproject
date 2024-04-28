import { useContext, useEffect } from "react"
import { UserContext } from "../context"

import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/user";

export const Appbar = () => {
    const navigate=useNavigate()
    
    const {user,removeUser}=useUser()
    const exit=()=>{
        removeUser("token");
        navigate("/signin")
    }

   

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4 ">
                {user["firstName"]}               
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U 
                </div>
                
            </div>
            <button onClick={user? ()=>{console.log(user)}:exit }>{user? "Logout":"Login"}</button>
        </div>
    </div>
}