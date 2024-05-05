import { useContext } from "react";
import { UserContext } from "../context";
import { useLocalStorage } from "./localstorage";
import { json } from "react-router-dom";


  export const useUser = () => {
    const { user, setname } = useContext(UserContext);
    
    const { setItem,removeItem ,getItem} = useLocalStorage();
    let temp={
        firstName:"abc"
    }
  
    const addUser = (user,token) => {
    console.log("orginal user: ",user);
    const parse=JSON.stringify(user)
     setname(user)
      setItem("token", token);
      setItem("user",parse)
    };
  
    function getUser(user){
      const u=localStorage.getItem("user")
      const data=JSON.parse(u)
      console.log("u", data)
      
      
      return data;      
    }
    const removeUser = () => {
        removeItem("user")
        removeItem("token");
    };
  
    return { user, addUser,getUser, removeUser };
  };