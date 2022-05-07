import axios from "axios";

export default {
    getArtists(token){
        return  axios({
            method: 'GET',
            url: "http://127.0.0.1:3000/api/v1/artists",
            headers: {Authorization: `Bearer ${token}`}
        })
    },
    addArtist(newArtist, token){
        return  axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/api/v1/artists',
            headers: { Authorization: `Bearer ${token}` },
            data:{
                artist:{name: newArtist}
            }
        })
    },
}
