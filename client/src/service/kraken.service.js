import axios from 'axios'

export default class KrakenService {

    constructor() {
        this.api = axios.create({
            // baseURLLocal: 'http://localhost:5000/api/auth',
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getProject = () => this.api.get('/kraken/project/5f7affe663dd150402a5a331')
}