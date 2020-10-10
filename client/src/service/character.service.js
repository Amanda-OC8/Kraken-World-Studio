import axios from 'axios'

export default class CharacterService {

    constructor() {
        this.api = axios.create({
            // baseURLLocal: 'http://localhost:5000/api/',
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getAllCharacters = project_id => this.api.get(`/kraken/allcharacters/project/${project_id}`)
    getCharacter = (project_id, character_id) => this.api.get(`/kraken//${character_id}/project/${project_id}`)
    newProject = (project_id, character_id, character) => this.appi.post(`/kraken/${character_id}/new/project/${project_id}`, character)
    editCharacter = (project_id, character_id, character) => this.api.put(`/kraken/${character_id}/edit/project/${project_id}`, character)
    deleteProject = (project_id, character_id) => this.api.delete(`/kraken/${character_id}/delete/project/${project_id}`)
}