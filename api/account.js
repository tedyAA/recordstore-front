import axios from "axios";

export default {
    signin(email, password){
       return axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/signin',
            data: {
                email: email,
                password: password
            }
        })
    },
    signup(email, password, password_confirmation){
        return axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/signup',
            data: {
                email: email,
                password: password,
                password_confirmation: password_confirmation
            }
        })
    }
}
