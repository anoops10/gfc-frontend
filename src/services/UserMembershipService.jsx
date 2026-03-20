import axios from "axios"

const baseUrl = "http://localhost:8080/usermembership"

export async function addNewUserMembership(userMemData) {
    try {
        const response = await axios.post(`${baseUrl}/add`, userMemData);
        return response.data;
    } catch (error) {
        console.log("error adding user's membership", error.response?.data || error.message);
        throw error;
    }
}

export async function showUserMembershipByID(uId) {
    try {
        const response = await axios.get(`${baseUrl}/show/${uId}`);
        return response.data;
    } catch (error) {
        console.log("error displaying user's membership", error.response?.data || error.message);
        throw error;
    }
}

export async function showUserMembershipByumID(umId) {
    try {
        const response = await axios.get(`${baseUrl}/showbyumid/${umId}`);
        return response.data;
    } catch (error) {
        console.log("error displaying user's membership", error.response?.data || error.message);
        throw error;
    }
}

// export async function showAllUserMembership(){
//         try{
//             const response = await axios.get(`${baseUrl}/showall`);
//             return response.data;
//         }catch(error){
//         console.log("error displaying user's membership", error.response?.data|| error.message);
//         throw error;
//     }
// }



export async function deleteUserMembershipByumID(umId) {
    try {
        const response = await axios.delete(`${baseUrl}/delete/${umId}`);
        return response.data;
    } catch (error) {
        console.log("error deleting user's membership", error.response?.data || error.message);
        throw error;
    }
}


// export async function updateUserMembership(umId, tId, umData) {
//     try {
//         const response = await axios.put(`${baseUrl}/update/${umId}/${tId}`, umData);
//         return response.data;
//     } catch (error) {
//         console.log("error updating user membership", error?.response?.data || error.message);
//         throw error;
//     }
// }

export async function countActiveMembers() {
    try {
        const response = await axios.get(`${baseUrl}/activecount`);
        return response.data;
    } catch (error) {
        console.log("error displaying count of active members", error.response?.data || error.message);
        throw error;
    }
}

export async function activeMembersList() {
    try {
        const response = await axios.get(`${baseUrl}/activelist`);
        return response.data;
    } catch (error) {
        console.log("error displaying active user's membership", error.response?.data || error.message);
        throw error;
    }
}