import axios from 'axios'
import { useLocalStorage } from './localstorage'

const value=useLocalStorage();
console.log(value)
// fetch("http://localhost:3000/api/v1/account/transfer",{
//     method:"POST",headers:{
//         'Content-Type': 'application/json',
//     Authorization:"Bearer "+localStorage.getItem("token")
// },
//     body:JSON.stringify({
//         to:id,
//         amount:amount
//     })  
// })