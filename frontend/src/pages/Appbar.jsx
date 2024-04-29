
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/user";

export const Appbar = () => {
    const navigate=useNavigate()
    
    const {user,removeUser}=useUser()
    const exit=()=>{
        removeUser("token");
        navigate("/signin")
    }

   

    return <div className="flex justify-center  h-20% ">

     <div className="shadow h-14 flex justify-between  rounded-xl w-3/4 bg-white px-6  mt-1">
        <div className="flex font-bold text-lg flex-col justify-center h-full text color text-purple-700  ">
            PayTM App
        </div>
        <div className="flex items-center gap-2 text-black ">
        <div className="rounded-full items-center h-9 w-9 bg-purple-800 text-white flex justify-center ">
                <div className="flex  flex-col justify-center h-6  text-sm">
                    U 
                </div>
                
            </div>
            <div className="flex flex-col mr-4  items-center min-w-fit  justify-center h-9  ">
                <h1 className="text-purple-700 font-bold">{user["firstName"]} </h1>              
            </div>
            
            <button className="bg-purple-700  text-white  p-2 rounded-md" onClick={user? ()=>{console.log(user)}:exit }>{user? "Logout":"Login"}</button>
        </div>
    </div>
    </div>
}