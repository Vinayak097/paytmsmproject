import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import { useUser } from "../hooks/user"

export const Signup = () => {
  const navigate=useNavigate();
  const addUser=useUser();
  
  const [username,setUsername]=useState("");
  const [Password,setPassword]=useState("");
  const [firstName,setfristName]=useState("");
  const [lastName,setlastName]=useState("");
  const handleSignup = async() => {
    
    await fetch("http://localhost:3000/api/v1/user/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username, 
                firstName: firstName,
                lastName: lastName,
                password: Password
            })
        })
        
        .then(async(response) =>{
          if(response.ok){
          const data=await response.json();
          addUser(data.user,data.token);
          navigate("/main");
          }else{
            throw new error 
                }
    
        })
        .catch((error) => 
        alert("error in sigin",error));
    };


    return <div className=" h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={(e)=>{
          setfristName(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={(e)=>{
          setlastName(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={(e)=>{
          setUsername(e.target.value);
        }} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange={(e)=>{
          setPassword(e.target.value);
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={()=>{ handleSignup()
          
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}