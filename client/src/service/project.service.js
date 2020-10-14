import axios from 'axios'

export default class ProjectService {

    constructor() {
        this.api = axios.create({
            // baseURLLocal: 'http://localhost:5000/api/',
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getProject = id => this.api.get(`/project/${id}`)
    newProject = project => this.api.post('/project/new', project)
    editProject = (id, project) => this.api.put(`/project/${id}/edit`, project)
    deleteProject = id => this.api.delete(`/project/${id}/delete`)
    getAllProjects = () => this.api.get('/project/all')
    getTimeline = id => this.api.get(`/timeline/project/${id}`)
    // editTimeline = id => this.api.put(`/timeline/edit/project/${id}`)
    // addTimeline = id => this.api.post(`/timeline/new/project/${id}`)
    getStory = id => this.api.get(`/project/story/${id}`)
}