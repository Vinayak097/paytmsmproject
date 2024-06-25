import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Toaster, toast } from 'react-hot-toast';
import { useUser } from "../hooks/user";
import Spinner from "../components/Spinner";
import { backend_url } from "../config";

export const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { addUser } = useUser();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      if (!email || !password) {
        toast.error("Please fill in all credentials");
        setLoading(false);
        return;
      }

      const data = {
        email: email,
        password: password
      };

      const response = await fetch(`${backend_url}/user/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log('pasrse')
      setLoading(false);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData,"json parsed")
        throw new Error(errorData.message || 'Sign in failed');
      }

      const responseData = await response.json();
      console.log('Sign in success:', responseData);
      addUser(responseData.user, responseData.token);
      navigate("/main");

    } catch (error) {
      console.log("error hpaeed")
      setLoading(false);
      toast.error(error.message || 'Error in signing in. Please try again later.');
      console.error('Error in signing in:', error);
    }
  };

  return (
    <div className="h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            label={"Password"}
            type="password"
          />
          <div className="pt-4">
            <Button onClick={handleSignIn} label={loading ? <Spinner /> : "Sign in"} />
          </div>
          <Toaster />
        </div>
      </div>
    </div>
  );
};
