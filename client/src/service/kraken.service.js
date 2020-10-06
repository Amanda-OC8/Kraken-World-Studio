import axios from 'axios'

export default class KrakenService {

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5000/api/kraken',
            withCredentials: true
        })
    }

    getProject = () => this.api.get('/project/5f7affe663dd150402a5a331')
}