const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/User.model')
const Project = require('../models/Project.model')
const Character = require('../models/Character.model')
const Folder = require('../models/Folder.model')
const Archive = require('../models/Archive.model')

//Endints User
router.get('/profile', (req, res) => {

    // const userPromise = User.findById(req.user._id)


    // const pojectPromise = Project.find({ "owner": { $in: [req.user._id] } }, { a mostrar })

    // Promise.all([projectPromise, userPromise])
    //     .then(response => res.json(response))
    //     .catch(err => res.status(500).json(err))
        
})

router.post('/profile/edit', (req, res) => {

    // const {deconstruido} = req.body


    // User.findByIdAndUpdate(req.user._id, { deconstruido })
    //     .then(response => res.json(response))
    //     .catch(err => res.status(500).json(err))

})

//Endpoints Project
router.get('/project/:project_id', (req, res) => {

    const projectId = req.params.project_id

    Project.findById(projectId)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/project/new', (req, res) => {

    Project.create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/project/:project_id', (req, res) => {

    const projectId = req.params.project_id

    Project.findByIdAndUpdate(projectId, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/project/:project_id/delete', (req, res) => {

    const projectId = req.params.project_id

    Project.findByIdAndDelete(projectId)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

//Endpoints Character
router.get('/project/:project_id/:character_id', (req, res) => {

    const projectId = req.params.project_id
    const characterId = req.params.character_id

    const projectPromise = Project.findById(projectId)
    const characterPromise = Character.findById(characterId)

    Promise.all([projectPromise, characterPromise])
    .then(response => res.json(response))
    .catch(err => res.status(500).json(err))
})

router.post('/project/:project_id/:character_id/edit', (req, res) => {
    
    // const projectId = req.params.project_id
    // const characterId = req.params.character_id
    
    // const { name, actType, shortDescription, longDescription, minParticipants, maxParticipants, minAge, maxAge, materials, monuments } = req.body

    // Character.findByIdAndUpdate(characterId, { deconstruido, OriginProject: { $in: projectId } })
    //     .then(response => res.json(response))
    //     .catch(err => res.status(500).json(err))
   
})

router.put('/project/:project_id/character/new', (req, res) => {

    // const projectId = req.params.project_id

    // const { name, actType, shortDescription, longDescription, minParticipants, maxParticipants, minAge, maxAge, materials, monuments } = req.body

    // Character.create({ deconstruido, OriginProject: { $in: projectId } })
    //     .then(response => res.json(response))
    //     .catch(err => res.status(500).json(err))

})

router.delete('/project/:project_id/:character_id/delete', (req, res) => {

    const projectId = req.params.project_id
    const characterId = req.params.character_id

    const projectPromise = Project.findById(projectId)
    const characterPromise = Character.findByIdandDelete(characterId)

    Promise.all([projectPromise, characterPromise])
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

//Endpoints Folder
router.get('/project/:project_id/:folder_id', (req, res) => {

    const projectId = req.params.project_id
    const folderId = req.params.folder_id

    const projectPromise = Project.findById(projectId)
    const folderPromise = Folder.findById(folderId)

    Promise.all([projectPromise, folderPromise])
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/project/:project_id/:folder_id/edit', (req, res) => {

    // const projectId = req.params.project_id
    // const folderId = req.params.folder_id

    // const { name, actType, shortDescription, longDescription, minParticipants, maxParticipants, minAge, maxAge, materials, monuments } = req.body

    // Folder.findByIdAndUpdate(folderId, { deconstruido, OriginProject: { $in: projectId } })
    //     .then(response => res.json(response))
    //     .catch(err => res.status(500).json(err))

})

router.put('/project/:project_id/folder/new', (req, res) => {

    const projectId = req.params.project_id

    const projectPromise = Project.findById(projectId)
    const folderPromise = Folder.find({ "OriginProject": { $in: [projectId] } })

    Promise.all([projectPromise, folderPromise])
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/project/:project_id/:folder_id/delete', (req, res) => {

    const projectId = req.params.project_id
    const folderId = req.params.folder_id

    const projectPromise = Project.findById(projectId)
    const folderPromise = Folder.findByIdAndDelete(folderId)

    Promise.all([projectPromise, folderPromise])
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

//Endpoints Archive
router.get('/project/:project_id/:folder_id/:archive_id', (req, res) => {

    const projectId = req.params.project_id
    const folderId = req.params.folder_id
    const archiveId = req.params.archive_id

    const projectPromise = Project.findById(projectId)
    const folderPromise = Folder.findById(folderId)
    const archivePromise = Archive.findById(archiveId)

    Promise.all([projectPromise, folderPromise, archivePromise])
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/project/:project_id/:folder_id/:archive_id/edit', (req, res) => {

    // const projectId = req.params.project_id
    // const folderId = req.params.folder_id
    // const archiveId = req.params.archive_id

    // const { name, actType, shortDescription, longDescription, minParticipants, maxParticipants, minAge, maxAge, materials, monuments } = req.body

    // Folder.findByIdAndUpdate(folderId, { deconstruido, OriginProject: { $in: projectId }, OriginFolder: archiveId })
    //     .then(response => res.json(response))
    //     .catch(err => res.status(500).json(err))
    
})

router.put('/project/:project_id/:folder_id/archive/new', (req, res) => {

    // const projectId = req.params.project_id

    // const projectId = req.params.project_id

    // const { name, actType, shortDescription, longDescription, minParticipants, maxParticipants, minAge, maxAge, materials, monuments } = req.body

    // Archive.create({ deconstruido, OriginProject: { $in: projectId }, OriginFolder: archiveId })
    //     .then(response => res.json(response))
    //     .catch(err => res.status(500).json(err))
})

router.delete('/project/:project_id/:folder_id/:archive_id/edit', (req, res) => {

    const projectId = req.params.project_id
    const folderId = req.params.folder_id
    const archiveId = req.params.archive_id

    const projectPromise = Project.findById(projectId)
    const folderPromise = Folder.findById(folderId)
    const archivePromise = Archive.findByIdAndDelete(archiveId)

    Promise.all([projectPromise, folderPromise, archivePromise])
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

//Endpoints Timeline
router.get('/project/:project_id/timeline', (req, res) => {

    const projectId = req.params.project_id
   
    
    Project.findById(projectId, { timeline: 1 })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.put('/project/:project_id/timeline', (req, res) => {

    const projectId = req.params.project_id
    const timeline = req.body


    Project.findByIdAndUpdate(projectId, { timeline })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

//Endpoints Glossary
router.get('/project/:project_id/glossary', (req, res) => {

    const projectId = req.params.project_id


    Project.findById(projectId, { glossary: 1 })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.put('/project/:project_id/glossary', (req, res) => {

    const projectId = req.params.project_id
    const glossary = req.body


    Project.findByIdAndUpdate(projectId, { glossary })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

//Endpoints History
router.get('/project/:project_id/history', (req, res) => {

    const projectId = req.params.project_id


    Project.findById(projectId, { history: 1 })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.put('/project/:project_id/history', (req, res) => {

    const projectId = req.params.project_id
    const story = req.body


    Project.findByIdAndUpdate(projectId, { story })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})


//Endpoint wiki view

router.get('/project/:project_id/wiki-elements', (req, res) => {

    const projectId = req.params.project_id

    const projectPromise = Project.findById(projectId)
    const characterPromise = Character.find({ $and: [{ OriginProject: { $in: projectId } }, { isPublic: { $exists: true } }] })
    const archivePromise = Archive.find({ $and: [{ OriginProject: { $in: projectId } }, { isPublic: { $exists: true } }] })

    Promise.all([projectPromise, characterPromise, archivePromise])
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

// Endpoint Public view projects

router.get('/all-projects', (req, res) => {

    
   Project.find({proyeccion})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.get('/all-projects/results', (req, res) => {

    // const queryResults = req.query.results
    
    // Project.find({querys result})
    //     .then(response => res.json(response))
    //     .catch(err => res.status(500).json(err))
})


module.exports = router