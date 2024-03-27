import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Signup } from "./Signup"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
// import { BottomWarning } from "../components/BottomWarning"
export const Signin = () => {
  const navigate=useNavigate();
  const [Email,setEmail]=useState("");
  const [Password,setPassword]=useState("")
   function naves(){
     fetch("http://localhost:3000/api/v1/user/signin",{
    method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
      body:JSON.stringify({
        username:Email,
        password:Password
      })
    })
    .then(async(response) =>{
      if(response.ok){
      const data=await response.json();
      if(localStorage.getItem("token")){
        localStorage.removeItem("token")
      }
      localStorage.setItem("token",data.token);
      navigate("/dashboard");
      }
      
    })
    
    
    .catch((error) => 
    alert("error"));
  }  

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={(e)=>{
          setEmail(e.target.value);
        }} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange={(e)=>{
          setPassword(e.target.value);
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async ()=>{await naves()}} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        
      </div>
    </div>
  </div>
}