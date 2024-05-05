import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Signup } from "./Signup"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Toaster, toast } from 'react-hot-toast';
import { useLocalStorage } from "../hooks/localstorage"
import { useUser } from "../hooks/user"
// import { BottomWarning } from "../components/BottomWarning"
export const Signin = () => {
  const navigate=useNavigate();
  const [email,setemail]=useState("");
  const [Password,setPassword]=useState("")
  const {addUser}=useUser()
   function naves(){
    if(!email || !Password){
      toast.error("fill credintials")
      return 
    }
     fetch("http://localhost:3000/api/v1/user/signin",{
    method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
      body:JSON.stringify({
        email:email,
        password:Password
      })
    })
   
    .then(async(response) =>{
      const data=await response.json();
      if(response.ok){
      
        console.log("success")
        addUser(data.user,data.token);
        navigate("/main");
        }
        else{
          console.log("error in signup",data.message);
          toast.error(data.message)
  
        }

    })
    .catch((error) =>
      
      toast.error(error)
    );
  }  

    return <div className="h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={(e)=>{
          setemail(e.target.value);
        }} placeholder="harkirat@gmail.com" label={"email"} />
        <InputBox onChange={(e)=>{
          setPassword(e.target.value);
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async ()=>{await naves()}} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        <Toaster></Toaster>
        
      </div>
    </div>
  </div>
}