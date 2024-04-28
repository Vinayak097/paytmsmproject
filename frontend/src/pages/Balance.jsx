import { useState } from "react"

export const Balance = ({ value }) => {
    console.log("value in balance ",value)
    
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {value}
        </div>
    </div>
}