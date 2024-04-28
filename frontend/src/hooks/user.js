import { useContext } from "react";
import { UserContext } from "../context";
import { useLocalStorage } from "./localstorage";


  export const useUser = () => {
    const { user, setname } = useContext(UserContext);
    const { setItem,removeItem } = useLocalStorage();
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
  
    const removeUser = () => {
        removeUser("user")
        removeItem("token");
    };
  
    return { user, addUser, removeUser };
  };