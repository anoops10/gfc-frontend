import axios from "axios"

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/users`

export async function getAllUsers() {
    try{    const response = await axios.get(`${baseUrl}/showalluser`)
    // console.log(response.data)
    return response.data;
    }catch(error){
        console.log("error getting user", error.response?.data||error.message)
        throw error
    }
}

export async function addNewUser(user, image){
    const formData = new FormData()

    formData.append('uName', user.uName);
    formData.append('emailId', user.emailId);
    formData.append('phone', user.phone);
    formData.append('password', user.password);
    formData.append('role', user.role);
    formData.append('gender', user.gender);
    formData.append('dob', user.dob);
    formData.append('address', user.address);

    if (image && image.size > 0) {
    formData.append("file", image);
    }

    try {
        const response = await axios.post(`${baseUrl}/adduser`, formData,{
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert("User added successfully! Please login to continue.")
        return response.data;
    } catch (error) {
        console.log("Error adding users", error.response?.data || error.message);
        throw error;
    }
}

export function getImage(uId){
    return `${baseUrl}/userimg/${uId}`;
}

export async function getUserById(uId){
    try{
        const response = await axios.get(`${baseUrl}/user/${uId}`)
        return response.data
    }catch(error){
        console.log("error finding user", error.response?.data || error.message)
        throw error
    }
}


export async function getUserByEmailId(emailId){
    try{
        const response = await axios.get(`${baseUrl}/userbyemail/${emailId}`)
        return response.data
    }catch(error){
        console.log("error finding user", error.response?.data || error.message)
        throw error
    }
}

export async function updateUserData(emailId, user){
    try{
        const response = await axios.put(`${baseUrl}/update/${emailId}`, user)
        return response.data
    }catch(error){
        console.log("error updating user", error.response?.data|| error.message)
        throw error
    }
}

export async function deleteUser(uId){
    try{
        const response = await axios.delete(`${baseUrl}/delete/${uId}`)
        return response.data
    }catch(error){
        console.log("error deleting user", error.response?.data|| error.message)
        throw error
    }
}