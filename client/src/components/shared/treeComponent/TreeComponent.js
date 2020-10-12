import React, { Component } from 'react'

import commonService from '../../../service/common.service'

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
    }

    componentDidMount = () => {
        this.commonService
            .getTree(this.props.match.params.project_id)
            .then(response => this.setState({ components: response.data }))
            .catch(err => console.log('Error:', err))
    }

    createNode = () => {
        let tree = {characters: [], folders: [], nested : [], archives: []}

        this.state.components.map(elm => elm.map(subelm => {

            if (subelm.model === "Character") {

                tree.characters.push({name: `${subelm.name} ${subelm.surname}`, id: subelm._id})

            } else if (subelm.model === "Folder") {
                
                if (subelm.archives.length ) {
                    subelm.archives.map(arElm => arElm.parentFolder === subelm._id ? tree.archives.push({name: arElm.name, id: arElm._id}) : null)
                }
                
                if (tree.archives.length) {
                    tree.nested.push({parent: {name : subelm.name, id: subelm._id},  nested: tree.archives })
                } else {
                    tree.folders.push({ name: subelm.name, id: subelm._id })
                }
                tree.archives= []
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
                console.log(treeC.nested)
                children = (
                    <ul>
                        {treeC.nested.map(elm => elm.nested ? elm.nested.map((subelm, index) => <li key={index}><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/${elm.parent.id}/${subelm.id}/details`}>{subelm.name}</Link> <img className="image" src={Add} alt="Añadir"></img>
                            <img className="image" src={Edit} alt="Editar"></img>
                            <img className="image" src={Delete} alt="Eliminar"></img></li>) : null)}
                    </ul>
                )
            }

        }

       

        return (
            <>

                <ul>
                    <h4><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/all-characters`}>Personajes</Link></h4>
                    {existTree && treeC.characters.map((elm, index) => <li key={index}><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/${elm.id}/details`}>{elm.name}</Link>
                        <Link to={`/projects/${this.props.match.params.project_id}/${elm.id}/character-new`}><img className="image" src={Add} alt="Añadir"></img></Link>
                        <Link to={`/projects/${this.props.match.params.project_id}/${elm.id}/edit`}><img className="image" src={Edit} alt="Editar" /></Link>
                        <Link to={`/projects/${this.props.match.params.project_id}/${elm.id}/delete`}><img className="image" src={Delete} alt="Eliminar"></img></Link></li>)}
                    <br/>
                    <h4>Carpetas y archivos</h4>
                    {existTree && treeC.folders.map((elm, index) => <li key={index}><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/${elm.id}/details`}>{elm.name}</Link> <img className="image" src={Add} alt="Añadir"></img>
                        <img className="image" src={Edit} alt="Editar"></img>
                        <img className="image" src={Delete} alt="Eliminar"></img></li>)}
                    {existTree && treeC.nested.map((elm, index) => <li key={index}><Link className="tree-link" to={`/projects/${this.props.match.params.project_id}/${elm.parent.id}/details`}>{elm.parent.name}</Link><img className="image" src={Add} alt="Añadir"></img>
                        <img className="image" src={Edit} alt="Editar"></img>
                        <img className="image" src={Delete} alt="Eliminar"></img></li>)}
                    {existTree && children}

                </ul>

            </>
        )
    }
}
export default TreeComponent