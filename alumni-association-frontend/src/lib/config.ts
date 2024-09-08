import axios from "axios";

export const BACKEND_URL = "http://localhost:5000";

export const isAuthenticated = async () => {
    try{
        console.log("Is Authenticated")
        const response = await axios.post(`${BACKEND_URL}/api/v1/users/getUser`);
        return response;
    }
    catch(e){
        console.log(e);
        return ;     
    }
}