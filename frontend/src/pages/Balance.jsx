

export const Balance = ({ value }) => {
    
  
   
    console.log("value in balance ",value)
    
    return <div className="flex">
        <div className="font-bold pl-2 text-lg">
          balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {value}
        </div>
    </div>
}