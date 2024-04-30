import { createContext, useState } from "react";


const UserContext=createContext();

const UserProvider=(props)=>{
    
    const {children}=props;
    
    const [user ,setname]=useState();
   
    
    return <UserContext.Provider value={{user,setname}}>
       {children}
    </UserContext.Provider>
}
 
export {UserContext,UserProvider};


