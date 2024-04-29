import { useContext, useState } from "react";
import { UserContext } from "../context";

export const useLocalStorage = () => {
  const {user,setname}=useContext(UserContext)
  const [value, setValue] = useState("");

  const setItem = (key, value) => {
    localStorage.setItem(key, value);
    setValue(value);
  };

  const getItem=()=>{
    const token=localStorage.getItem("token")
    return token;
  }

  const removeItem = (key) => {
    localStorage.removeItem(key);
    setValue(null);
  };

  return { value, setItem, getItem, removeItem };
};
