
import { useContext } from "react"
import { UserContext } from "../context"

export const Balance = ({ value }) => {
    const {user, setname}=useContext(UserContext);
  
   
    console.log("value in balance ",value)
    
    return <div className="flex">
        <div className="font-bold pl-2 text-lg">
          balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {value}
        </div>
    </div>
}