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
   removeArtist(artist_id, token){
        return  axios({
            method: 'delete',
            url: `/api/v1/artists/${artist_id}`,
            headers: { Authorization: `Bearer ${token}` },
        })
    },
   updateArtist(artist_id, name, token){
        return  axios({
            method: 'patch',
            url: `/api/v1/artists/${artist_id}`,
            headers: { Authorization: `Bearer ${token}` },
            data:{
                artist: {title: name}
            }
        })
    },
}
