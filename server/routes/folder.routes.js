const express = require('express')
const router = express.Router()



const Project = require('../models/project.model')
const Folder = require('../models/folder.model')


//Endpoints Folder
router.get('/allfolders/project/:project_id', (req, res) => {
    console.log(req.params.project_id)

    Folder.find()
    .populate({
        path: "originProject",
        match: { _id: req.params.project_id },
        select: "title genre"
    })
    .populate("owner")
    .then(response => {
        let filterResponse = response.filter(elm => elm.originProject != null)
        res.json(filterResponse)
    })
    .catch(err => res.status(500).json(err))
})

router.get('/:folder_id/project/:project_id/', (req, res) => {
   
    Folder.findById(req.params.folder_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/new/project/:project_id', (req, res) => {

    const projectId = req.params.project_id

    const { name, isPublic } = req.body

    const projectPromise = Project.findById(projectId)
    const folderPromise = Folder.create({ name, isPublic, OriginProject: projectId, owner: req.user._id })

    Promise.all([projectPromise, folderPromise])
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/:folder_id/edit/project/:project_id/', (req, res) => {

        const { name, isPublic } = req.body

        Folder.findByIdAndUpdate(req.params.folder_id, { name, isPublic})
            .then(response => res.json(response))
            .catch(err => res.status(500).json(err))

})

router.delete('/:folder_id/delete/project/:project_id', (req, res) => {

    Folder.findByIdAndDelete(req.params.folder_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router