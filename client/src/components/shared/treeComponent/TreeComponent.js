import React, { Component } from 'react'

import commonService from '../../../service/common.service'
import characterService from '../../../service/character.service'
import folderService from '../../../service/folder.service'
import archiveService from '../../../service/archive.service'




import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import './TreeComponent.css'
import Add from './add.svg'
import Edit from './edit-color.svg'
import Delete from './delete.svg'

class TreeComponent extends Component {
    constructor() {
        super()
        this.state = {
            treeComponent: [],
            components: []
        }
        this.commonService = new commonService()
        this.characterService = new characterService()
        this.folderService = new folderService()
        this.archiveService = new archiveService()


    }

    componentDidMount = () => {
        this.loadCommon()
    }


    loadCommon = () => {
        
        this.commonService
            .getTree(this.props.match.params.project_id)
            .then(response => this.setState({ components: response.data }))
            .catch(err => console.log('Error:', err))

    }


    deleteCharacter = (character_id) => {

        this.characterService
            .deleteCharacter(this.props.match.params.project_id, character_id)
            .then(() => console.log("borrado"))
            .catch(err => console.log('Error:', err))

        this.loadCommon()
    }

    deleteFolder = (folder_id) => {

        this.folderService
            .deleteFolder(this.props.match.params.project_id, folder_id)
            .then(() => console.log("borrado"))
            .catch(err => console.log('Error:', err))

        this.loadCommon()
    }

    deleteArchive = (folder_id, archive_id) => {

        this.folderService
            .deleteFolder(this.props.match.params.project_id, folder_id, archive_id)
            .then(() => console.log("borrado"))
            .catch(err => console.log('Error:', err))

        this.loadCommon()
    }

    createNode = () => {
        let tree = { characters: [], folders: [], nested: [], archives: [] }
        
        this.state.components.map(elm => elm.map(subelm => {
            
            if (subelm.model === "Character") {
                
                tree.characters.push({ name: `${subelm.name} ${subelm.surname}`, id: subelm._id })
                
            } else if (subelm.model === "Folder") {
                
                if (subelm.archives.length) {
                    console.log(subelm)
                    subelm.archives.map(arElm => arElm.parentFolder === subelm._id ? tree.archives.push({ name: arElm.name, id: arElm._id }) : null)
                }

                if (tree.archives.length) {
                    tree.nested.push({ parent: { name: subelm.name, id: subelm._id }, nested: tree.archives })
                } else {
                    tree.folders.push({ name: subelm.name, id: subelm._id })
                }
                tree.archives = []
            }

        }))
        console.log(tree, this.state)
        return tree


    }


    render() {
        let treeC = {}
        let existTree = false
        let children = null;
        if (this.state.components.length !== 0) {
            treeC = this.createNode()
            existTree = true

            if (treeC.nested) {

                children = (
                    <ul>
                        {treeC.nested.map(elm => elm.nested ? elm.nested.map((subelm, index) => <li key={index}><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/${elm.parent.id}/${subelm.id}/details`}>{subelm.name}</Link>
                            
                            <Link to={`/projects/${this.props.match.params.project_id}/${elm.parent.id}/${subelm.id}/archive/edit`}><img className="image" src={Edit} alt="Editar" /></Link>
                            <Link onClick={() => this.deleteArchive(elm.parent.id, subelm.id)}><img className="image" src={Delete} alt="Eliminar"></img></Link></li>) : null)}
                    </ul>
                )
            }

        }



        return (
            <>

                <ul>
                    <h4><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/all-characters`}>Personajes</Link> <Link to={`/projects/${this.props.match.params.project_id}/character/new`}><img className="image" src={Add} alt="Añadir"></img></Link></h4>
                    {existTree && treeC.characters.map((elm, index) => <li key={index}><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/${elm.id}/character/details`}>{elm.name}</Link>
                        
                        <Link to={`/projects/${this.props.match.params.project_id}/${elm.id}/character/edit`}><img className="image" src={Edit} alt="Editar" /></Link>
                        <Link onClick={() => this.deleteCharacter(elm.id)}><img className="image" src={Delete} alt="Eliminar"></img></Link></li>)}
                    <br />
                    <h4>Carpetas y archivos<Link to={`/projects/${this.props.match.params.project_id}/folder/new`}><img className="image" src={Add} alt="Añadir"></img></Link></h4>
                    {existTree && treeC.folders.map((elm, index) => <li key={index}><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/${elm.id}/details`}>{elm.name}</Link>
                        <Link to={`/projects/${this.props.match.params.project_id}/${elm.id}/archive/new`}><img className="image" src={Add} alt="Añadir"></img></Link>
                        <Link to={`/projects/${this.props.match.params.project_id}/${elm.id}/folder/edit`}><img className="image" src={Edit} alt="Editar" /></Link>
                        <Link onClick={() => this.deleteFolder(elm.id)}><img className="image" src={Delete} alt="Eliminar"></img></Link></li>)}
                    {existTree && treeC.nested.map((elm, index) => <li key={index}><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/${elm.parent.id}/details`}>{elm.parent.name}</Link> <Link to={`/projects/${this.props.match.params.project_id}/${elm.parent.id}/archive/new`}><img className="image" src={Add} alt="Añadir"></img></Link>
                        <Link to={`/projects/${this.props.match.params.project_id}/${elm.parent.id}/folder/edit`}><img className="image" src={Edit} alt="Editar" /></Link>
                        <Link onClick={() => this.deleteFolder(elm.parent.id)}><img className="image" src={Delete} alt="Eliminar"></img></Link></li>)}
                    {existTree && children}

                </ul>

            </>
        )
    }
}
export default TreeComponent