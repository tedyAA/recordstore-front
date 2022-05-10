import axios from "axios";

export default {
    getAdminInfo(token){
        return  axios({
            method: 'GET',
            url: "http://127.0.0.1:3000/api/v1/users",
            headers: {Authorization: `Bearer ${token}`}
        })
    }
}
