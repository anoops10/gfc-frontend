import axios from "axios";

const baseUrl = "http://localhost:8080/membership"

export async function addNewMembership(mem) {
    try {
        const response = await axios.post(`${baseUrl}/add`, mem);
        return response.data;
    } catch (error) {
        console.log("error adding membership", error.response?.data || error.message);
        throw error;
    }
}

export async function listAllMembership(){
    try{
        const response = await axios.get(`${baseUrl}/showall`);
        return response.data
    }catch(error){
        console.log("error displaying all membership", error.response?.data || error.message)
        throw error;
    }
}

export async function getMemById(mId) {
    try{
        const response = await axios.get(`${baseUrl}/showmembership/${mId}`);
        return response.data
    }catch(error){
        console.log("error updating membership", error.response?.data || error.message)
        throw error;
    }
}

export async function updateMembership(mId, mem){
    try{
        const response = await axios.put(`${baseUrl}/update/${mId}`, mem)
        return response.data;
    }
    catch(error){
        console.log("Error updating membership", error.response?.data||error.message)
        throw error
    }
}

export async function deleteMembership(memId){
    try{
        const response = await axios.delete(`${baseUrl}/delete/${memId}`)
            return response.data;
    }catch(error){
        console.log("error deleting membership entry", error.response?.data || error.message)
        throw error
    }
}
