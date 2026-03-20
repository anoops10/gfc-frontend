import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/client`;


export async function addClient(client, tId){
    try{
        const response = await axios.post(`${baseUrl}/add/${tId}`, client);
        return response.data;
    }catch(error){
        console.error("error adding client data", error.response?.data || error.message);
        throw error;
    }
}


export async function updateClient(clientId, client){
    try{
        const response = await axios.put(`${baseUrl}/update/${clientId}`, client, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }catch(error){
        console.error("error updating client data", error.response?.data || error.message);
        throw error;
    }
}

export async function findClientByTrainer(tId){
    try{
        const response = await axios.get(`${baseUrl}/findbytid/${tId}`);
        return response.data;
    }catch(error){
        console.error("error finding client data", error.response?.data || error.message);
        throw error;
    }
}



export async function findClientByClientId(clientId){
    try{
        const response = await axios.get(`${baseUrl}/findbyid/${clientId}`);
        return response.data;
    }catch(error){
        console.error("error getting client data", error.response?.data || error.message);
        throw error;
    }
}


export async function findClientDataByUId(uId){
    try{
        const response = await axios.get(`${baseUrl}/findbyuid/${uId}`);
        return response.data;
    }catch(error){
        console.error("error finding client data", error.response?.data || error.message);
        throw error;
    }
}


// export async function addClient(client, tId){
//     try{
//         const response = await axios.post(`${baseUrl}/add/${tId}`, client);
//         return response.data;
//     }catch(error){
//         console.error("error adding client data", error.response?.data || error.message);
//         throw error;
//     }
// }



// export async function addClient(client, tId){
//     try{
//         const response = await axios.post(`${baseUrl}/add/${tId}`, client);
//         return response.data;
//     }catch(error){
//         console.error("error adding client data", error.response?.data || error.message);
//         throw error;
//     }
// }

