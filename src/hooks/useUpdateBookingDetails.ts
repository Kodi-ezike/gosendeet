import { useState } from "react";

export default function useUpdateBookingDetails(){
    const [details, setDetails] = useState<any>({})

    const updateDetails =(prev: any)=> setDetails(prev)

    return{
        details,
        setDetails,
        updateDetails
    }
}