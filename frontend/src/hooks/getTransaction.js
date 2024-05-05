import axios from 'axios'
import toast from 'react-hot-toast';
import { useLocalStorage } from './localstorage';




export const usegetTransaction=()=>{
    const {getItem}=useLocalStorage()
    const token=getItem;
   

     const  getTransaction =async(recieverId)=>{
        let data = JSON.stringify({
            "recieverId": recieverId
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/v1/account/getTchat',
            headers: { 
              'authorization': 'Bearer '+localStorage.getItem("token"), 
              'Content-Type': 'application/json', 
             
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data.chat));
          })
          .catch((error) => {
            toast.error("eror fetching transaction :"+error)
            console.log(error);
          });
          return data;
    }
    
    return {getTransaction}
}

