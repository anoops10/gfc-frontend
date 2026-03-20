import axios from "axios";

export async function sendMail(mail) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/sendmail`, mail);
        return response.data;
    } catch (error) {
        console.log("error sending mail", error.response?.data || error.message);
        throw error;
    }  
}