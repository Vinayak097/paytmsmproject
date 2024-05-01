import { useContext, useState } from "react";


export const useLocalStorage = () => {
 
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
