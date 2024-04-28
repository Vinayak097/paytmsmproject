import { createContext, useState } from "react";


const UserContext=createContext();

const UserProvider=(props)=>{
    const usedetail=JSON.parse(localStorage.getItem("user"))
    const {children}=props;
    if(usedetail){
        console.log("usedetail",usedetail)   
           
    }
    const [user ,setname]=useState(usedetail);
   
    
    return <UserContext.Provider value={{user,setname}}>
       {children}
    </UserContext.Provider>
}
 
export {UserContext,UserProvider};


