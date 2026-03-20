import axios from "axios";


export async function sendMail(mail) {
    try {
        const response = await axios.post(`http://localhost:8080/sendmail`, mail);
        return response.data;
    } catch (error) {
        console.log("error sending mail", error.response?.data || error.message);
        throw error;
    }  
}