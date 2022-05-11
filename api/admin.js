import axios from "axios";

export default {
    getAdminInfo(token){
        return  axios({
            method: 'GET',
            url: "http://127.0.0.1:3000/api/v1/users",
            headers: {Authorization: `Bearer ${token}`}
        })
    },
    deleteArtist(artist_id, token){
        return  axios({
            method: 'Delete',
            url: `http://127.0.0.1:3000/api/v1/artists/${artist_id}`,
            headers: {Authorization: `Bearer ${token}`}
        })
    },
    createArtist(newArtist, token){
        return  axios({
            method: 'Post',
            url: `http://127.0.0.1:3000/api/v1/artists`,
            headers: {Authorization: `Bearer ${token}`},
            data:{
                artist: { name: newArtist }
            }
        })
    },
    updateArtist(newArtist,artist_id, token){
        return  axios({
            method: 'Patch',
            url: `http://127.0.0.1:3000/api/v1/artists/${artist_id}`,
            headers: {Authorization: `Bearer ${token}`},
            data:{
                artist: { name: newArtist }
            }
        })
    },
    approveArtist(approved,artist_id, token){
        return  axios({
            method: 'Put',
            url: `http://127.0.0.1:3000/api/v1/artists/${artist_id}`,
            headers: { Authorization: `Bearer ${token}` },
            data:{
                artist:{approved: approved}
            }
        })
    },
}
