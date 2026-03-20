import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/trainer`

export async function addNewTrainer(trainer){
    try{
        const response = await axios.post(`${baseUrl}/add`, trainer)
        return response.data;
    }catch(error){
        console.error("error adding trainer", error.response?.data||error.message)
        throw error;
    }
}

export async function findTrainer(){
try{
        const response = await axios.get(`${baseUrl}/getall`)
        return response.data;
    }catch(error){
        console.error("error fetching trainer Data", error.response?.data||error.message)
        throw error;
    }
}

export async function findTrainerByUserId(uId){
try{
        const response = await axios.get(`${baseUrl}/findbyuserid/${uId}`)
        return response.data;
    }catch(error){
        console.error("error fetching trainer Data", error.response?.data||error.message)
        throw error;
    }
}

export async function findTrainerByTId(tId){
try{
        const response = await axios.get(`${baseUrl}/findbyid/${tId}`)
        return response.data;
    }catch(error){
        console.error("error fetching trainer Data", error.response?.data||error.message)
        throw error;
    }
}

export async function findTrainerByMemId(mId){
try{
        const response = await axios.get(`${baseUrl}/findbymemid/${mId}`)
        return response.data;
    }catch(error){
        console.error("error fetching trainer Data", error.response?.data||error.message)
        throw error;
    }
}

export async function deleteTrainer(tId){
    try{
        const response = await axios.delete(`${baseUrl}/delete/${tId}`)
        return response.data;
    }catch(error){
        console.error("error deleting trainer data", error.response?.data || error.message);
        throw error;
    }
}