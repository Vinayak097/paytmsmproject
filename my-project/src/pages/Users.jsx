import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Users = () => {
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, [filter]); // Empty dependency array to ensure it runs only once

    const fetchUsers = () => {
        fetch(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
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
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input onChange={(e) => { setFilter(e.target.value) }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200" />
            </div>
            <div>
                {users.map(user => <User  user={user} />)}
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
