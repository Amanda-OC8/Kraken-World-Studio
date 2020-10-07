import axios from 'axios'

export default class ProjectService {

    constructor() {
        this.api = axios.create({
            // baseURLLocal: 'http://localhost:5000/api/',
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getProject = id => this.api.get(`/kraken/project/${id}`)
    newProject = project => this.appi.post('/kraken/project/new', project)
    editProject = (id, project) => this.api.put(`/kraken/project/${id}/edit`, project)
    deleteProject = id => this.api.delete(`/kraken/project/${id}/delete`)

}