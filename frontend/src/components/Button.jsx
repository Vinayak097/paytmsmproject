import { memo } from "react"

export const Button=memo(({label, onClick}) =>{
    return <button onClick={onClick} type="button" className=" w-full text-white  bg-blue-400 hover:shadow-xl  hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-4 py-1 text-center ">{label}</button>
})
