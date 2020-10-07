import axios from 'axios'

export default class CharacterService {

    constructor() {
        this.api = axios.create({
            // baseURLLocal: 'http://localhost:5000/api/',
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getAllCharacters = project_id => this.api.get(`/kraken/project/${project_id}/allcharacters`)
    getCharacter = (project_id, character_id) => this.api.get(`/kraken/project/${project_id}/${character_id}`)
    newProject = (project_id, character_id, character) => this.appi.post(`/kraken/project/${project_id}/${character_id}/new`, character)
    editCharacter = (project_id, character_id, character) => this.api.put(`/kraken/project/${project_id}/${character_id}/edit`, character)
    deleteProject = (project_id, character_id) => this.api.delete(`/kraken/project/${project_id}/${character_id}/delete`)
}