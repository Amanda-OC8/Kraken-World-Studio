import axios from 'axios'

export default class ProjectService {

    constructor() {
        this.api = axios.create({
            // baseURLLocal: 'http://localhost:5000/api/',
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getProfile = () => this.api.get(`/kraken/profile`)
    editProfile = profile => this.appi.put(`/kraken/profile/edit`, profile)
}