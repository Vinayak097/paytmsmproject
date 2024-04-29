import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Appbar } from "./Appbar";
import { Balance } from "./Balance";
import { useNavigate } from "react-router-dom";
import toast, { ToastBar, Toaster } from "react-hot-toast";

export const Users = ({name}) => {
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);
    const [value,setValue]=useState(0)
    
    useEffect(()=>{
        getbalance()
    })
    async function getbalance() {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        if (!token) {
            throw new Error("Token not found in localStorage");
        }
        try{

        
        const response = await fetch("http://localhost:3000/api/v1/account/balance", {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }, 
        });
        if(!response.ok){
            return ;
        }
        const ans= await response.json();
        
        setValue(ans.balance)
    }
       catch(e){
      console.log("chekci internet /users.jsx")

        }
       
    };
    
    // Call the function and log the result
 
    
    
    
    
    
  
        

    useEffect(() => {
        fetchUsers();
    }, [filter]); // Empty dependency array to ensure it runs only once
    

    const fetchUsers = () => {
        fetch(`http://localhost:3000/api/v1/user/bulk?filter=${filter}&name=${name}`, {
            method: 'GET',
            
            headers: {
                'Content-Type': 'application/json'
            },
           
            
            
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setUsers(data.users); // Assuming the response object has a 'users' property
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            // Handle errors gracefully, e.g., display a message to the user
        });
    };

    return (
          <div className=" bg-white h-full rounded-lg  w-full ">
            
            <div className="py-2 mx-2 ">
                <input  className="" onChange={(e) => { setFilter(e.target.value) }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded bg-purple-100 " />
            </div>
            <div className="">
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
            </div>     
            
           
        
    );
};
function User({ user }) {
    const navigate=useNavigate();
    function changepage(){
        console.log("data sended ", user.firstName)
        navigate("/send?id="+user._id+"&name="+user.firstName)        
        
    }
    return (
        <div className="flex max-w-xl gap-4  justify-between">
            <div className="flex ">
                <div className="rounded-full h-9 w-9 bg-purple-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-md">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-ful">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>

            <div className="flex flex-col mx-2 justify-center h-ful">
                <Button onClick={()=>{
                    console.log(" clicke on sendmoney")
                    changepage();                                    
                    
                }} label={"pay"} />
                
            </div>
            <Toaster/>
        </div>
    );
}
