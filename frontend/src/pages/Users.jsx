import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Button } from "../components/Button";
import { backend_url } from "../config";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get(`${backend_url}/user/bulk?filter=${filter}`)
            .then(response => {
                setUsers(response.data.users);
                console.log(response.data.users," this is users.jsx")
            })
    }, [filter]);

    return(
        <>
        <div className="p-2  h-full shadow  rounded-lg bg-white overflow-auto">
            <div className="font-bold text-lg text-blue-500">
                Users
            </div>
            <div className=" my-2 ">
                <input onChange={(e) => {
                    setFilter(e.target.value);
                }} type="text" placeholder="Search users..." className="bg-blue-50 w-full px-2 py-1 border rounded border-slate-200"/>
            </div>
            <div className="flex  flex-col gap-1">
                {users.map(user => <User  user={user} />)}
            </div>
            </div>
        </>
    )
}

const  User=({user}) =>{
    const navigate = useNavigate();

    return(
        <div key={user._id} className="bg-blue-50 border-b-2 p-1 rounded-lg flex justify-between  ">
            <div className="flex">
                <div className="rounded-full h-8 w-8 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-cpl justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <h2>{user.firstName}</h2>
                
                        <h2>{user.lastName}</h2>
                </div>
            </div>

            <div className="flex flex-col justify-center h-ful">
                <Button onClick={(e) => {
                    navigate("/send?id=" + user._id + "&name=" + user.firstName);
                }} label={"pay"}/>
            </div>
        </div>
    )
}