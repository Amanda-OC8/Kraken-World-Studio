const express = require('express')
const router = express.Router()


const Project = require('../models/project.model')
const Character = require('../models/character.model')
const Folder = require('../models/folder.model')
const Archive = require('../models/archive.model')




// Endpoint Tree Component

router.get('/tree/:project_id', (req, res) => {

    const projectId = req.params.project_id

    const projectPromise = Project.findById(projectId)

    const characterPromise = (Character.find().populate({
        path: "originProject",
        match: { _id: req.params.project_id },
        select: "title"
    }).then(response => {
            let filterResponse = response.filter(elm => elm.originProject != null)
            res.json(filterResponse)
        })
        .catch(err => res.status(500).json(err))
    )
    const folderPromise = (Folder.find().populate({
        path: "originProject",
        match: { _id: req.params.project_id },
        select: "title"
    }).then(response => {
            let filterResponse = response.filter(elm => elm.originProject != null)
            res.json(filterResponse)
        })
        .catch(err => res.status(500).json(err))
    )

    const archivePromise = (Archive.find().populate({
        path: "originProject",
        match: { _id: req.params.project_id },
        select: "title"
    }).populate("parentFolder")
        .then(response => {
            let filterResponse = response.filter(elm => elm.originProject != null)
            res.json(filterResponse)
        })
        .catch(err => res.status(500).json(err))
    )

   


    Promise.all([projectPromise,  folderPromise])
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

// //Endpoint wiki view

router.get('/project/:project_id/wiki-elements', (req, res) => {

    const projectId = req.params.project_id

    const projectPromise = Project.findById(projectId)
    const characterPromise = Character.find({ $and: [{ OriginProject: { $in: projectId } }, { isPublic: { $exists: true } }] })
    const archivePromise = Archive.find({ $and: [{ OriginProject: { $in: projectId } }, { isPublic: { $exists: true } }] })

    Promise.all([projectPromise, characterPromise, archivePromise])
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})




module.exports = router