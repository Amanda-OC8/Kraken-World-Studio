import React, { Component } from 'react'

import commonService from '../../../service/common.service'
import characterService from '../../../service/character.service'
import folderService from '../../../service/folder.service'
import archiveService from '../../../service/archive.service'

import Collapse from 'react-bootstrap/Collapse'
import NavLink from 'react-bootstrap/NavLink'
import Modal from 'react-bootstrap/Modal'


import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import './TreeComponent.css'
import Add from './add.svg'
import Edit from './edit-color.svg'
import Delete from './delete.svg'
import FolderNew from '../../pages/folders/FolderNew'
import FolderEdit from '../../pages/folders/FolderEdit'


class TreeComponent extends Component {
    constructor() {
        super()
        this.state = {
            treeComponent: [],
            components: [],
            showMoreCharac: false,
            showMoreFolders: false, 
            showModalNewFolder: false,
            showModalEditFolder: false,
            selectFolder: ""


        }
        this.commonService = new commonService()
        this.characterService = new characterService()
        this.folderService = new folderService()
        this.archiveService = new archiveService()


    }

    componentDidMount = () => this.loadCommon()

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

    showMoreTextCharac = () => this.setState({ showMoreCharac: !this.state.showMoreCharac })
    showMoreTextFolders = () => this.setState({ showMoreFolders: !this.state.showMoreFolders })

    handleModalNewFolder = showModalNewFolder => this.setState({ showModalNewFolder })

    handleModalEditFolder = (showModalEditFolder, folderid) => { this.setState({ showModalEditFolder, selectFolder: folderid }) }


    createNode = () => {
        let tree = { characters: [], folders: [], nested: [], archives: [] }

        this.state.components.map(elm => elm.map(subelm => {

            if (subelm.model === "Character") {

                tree.characters.push({ name: `${subelm.name} ${subelm.surname}`, id: subelm._id })

            } else if (subelm.model === "Folder") {

                if (subelm.archives.length) {
                    
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
                    <h4><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/all-characters`}>Personajes</Link>
                        <Link to={`/projects/${this.props.match.params.project_id}/character/new`}><img className="image" src={Add} alt="Añadir"></img></Link></h4>
                    {!this.state.showMoreCharac && <NavLink onClick={this.showMoreTextCharac} className="show-more">Mostrar todos los personajes</NavLink>}
                    {this.state.showMoreCharac && <NavLink onClick={this.showMoreTextCharac} className="show-more">Ocultar todos los personajes </NavLink>}
                    <Collapse in={this.state.showMoreCharac}>
                        <span>
                            {existTree && treeC.characters.map((elm, index) => <li key={index}><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/${elm.id}/character/details`}>{elm.name}</Link>

                                <Link to={`/projects/${this.props.match.params.project_id}/${elm.id}/character/edit`}><img className="image" src={Edit} alt="Editar" /></Link>
                                <Link onClick={() => this.deleteCharacter(elm.id)}><img className="image" src={Delete} alt="Eliminar"></img></Link></li>)}
                        </span>
                    </Collapse>




                    <br />
                    <h4>Carpetas y archivos<Link onClick={() => this.handleModalNewFolder(true)}><img className="image" src={Add} alt="Añadir"></img></Link></h4>
                    {!this.state.showMoreFolders && <NavLink onClick={this.showMoreTextFolders} className="show-more">Mostrar todas las carpetas y archivos</NavLink>}
                    {this.state.showMoreFolders && <NavLink onClick={this.showMoreTextFolders} className="show-more">Mostrar todas las carpetas y archivos</NavLink>}

                    <Collapse in={this.state.showMoreFolders}>
                        <span>
                            {existTree && treeC.folders.map((elm, index) => <li key={index}><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/${elm.id}/details`}>{elm.name}</Link>
                                <Link to={`/projects/${this.props.match.params.project_id}/${elm.id}/archive/new`}><img className="image" src={Add} alt="Añadir"></img></Link>
                                <Link onClick={() => this.handleModalEditFolder(true, elm.id)}><img className="image" src={Edit} alt="Editar" /></Link>
                                <Link onClick={() => this.deleteFolder(elm.id)}><img className="image" src={Delete} alt="Eliminar"></img></Link></li>)}


                            {existTree && treeC.nested.map((elm, index) => <li key={index}><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/${elm.parent.id}/details`}>{elm.parent.name}</Link> <Link to={`/projects/${this.props.match.params.project_id}/${elm.parent.id}/archive/new`}><img className="image" src={Add} alt="Añadir"></img></Link>
                                <Link to={`/projects/${this.props.match.params.project_id}/${elm.parent.id}/folder/edit`}><img className="image" src={Edit} alt="Editar" /></Link>
                                <Link onClick={() => this.deleteFolder(elm.parent.id)}><img className="image" src={Delete} alt="Eliminar"></img></Link></li>)}
                            {existTree && children}
                        </span>
                    </Collapse>
                </ul>

                <Modal show={this.state.showModalNewFolder} onHide={() => this.handleModalNewFolder(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear nueva carpeta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FolderNew {...this.props} closeModal={() => this.handleModal(false)} refreshList={this.loadCommon} />
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showModalEditFolder} onHide={() => this.handleModalEditFolder(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar la carpeta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FolderEdit{...this.props} folder_id={this.state.selectFolder} closeModal={() => this.handleModal(false)} refreshList={this.loadCommon} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}
export default TreeComponent