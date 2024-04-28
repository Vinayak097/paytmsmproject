import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Appbar } from "./Appbar";
import { Balance } from "./Balance";
import { useNavigate } from "react-router-dom";

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
        <>
            <div className=""><Appbar></Appbar></div>
            <div className="mt-2"><Balance  value={value}></Balance></div>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input onChange={(e) => { setFilter(e.target.value) }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200" />
            </div>
            <div>
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </>
    );
};
function User({ user }) {
    const navigate=useNavigate();
    function changepage(){
        console.log("data sended ", user.firstName)
        navigate("/send?id="+user._id+"&name="+user.firstName)        
        
    }
    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-ful">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-ful">
                <Button onClick={()=>{
                    console.log(" clicke on sendmoney")
                    changepage();                                    
                    
                }} label={"Send Money"} />
            </div>
        </div>
    );
}
