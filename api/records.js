import axios from "axios";

export default {
    getRecords(token){
        return  axios({
            method: 'GET',
            url: "http://127.0.0.1:3000/api/v1/records",
            headers: {Authorization: `Bearer ${token}`}
        })
    },
    addRecord(title, year, artist_id, token){
        return  axios({
            method: 'POST',
            url: "http://127.0.0.1:3000/api/v1/records",
            headers: {Authorization: `Bearer ${token}`},
            data: {
                record: {
                    title: title,
                    year: year,
                    artist_id: artist_id
                }
            }
        })
    },
    removeRecord(title, year, artist_id, record_id, token){
        return   axios({
            method: 'DELETE',
            url: `http://127.0.0.1:3000/api/v1/records/${record_id}`,
            headers: {Authorization: `Bearer ${token}`},
            data: {
                record: {
                    title: title,
                    year: year,
                    artist_id: artist_id
                }
            }
        })
    },
    updateRecord(title, year, artist_id, record_id, token){
        return   axios({
            method: 'PATCH',
            url: `http://127.0.0.1:3000/api/v1/records/${record_id}`,
            headers: {Authorization: `Bearer ${token}`},
            data: {
                record: {
                    title: title,
                    year: year,
                    artist_id: artist_id
                }
            }
        })
    }
}
