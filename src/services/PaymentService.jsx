import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/payment`

export async function showAllPayments(){
    try{
        const response = await axios.get(`${baseUrl}/findall`)
        return response.data;
    }catch(error){
        console.error("error finding payment list", error.response?.data||error.message)
        throw error;
    }
}

export async function addPayments(payment){
    try{
        const response = await axios.post(`${baseUrl}/add`, payment)
        return response.data;
    }catch(error){
        console.error("error finding payment list", error.response?.data||error.message)
        throw error;
    }
}


export async function findPaymentBYUId(uId){
    try{
        const response = await axios.get(`${baseUrl}/findbyid/${uId}`)
        return response.data;
    }catch(error){
        console.error("error finding payment list", error.response?.data||error.message)
        throw error;
    }
}