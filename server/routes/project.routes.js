const express = require('express')
const router = express.Router()


const Project = require('../models/project.model')


// Endpoint Public view projects

router.get('/all', (req, res) => {
    Project.find()
        .populate("owner")
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

//Endpoints Project
router.get('/:project_id', (req, res) => {
    
    Project.findById(req.params.project_id)
        .populate("owner")
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/new', (req, res) => {

    Project.create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/:project_id/edit', (req, res) => {

    Project.findByIdAndUpdate(req.params.project_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/:project_id/delete', (req, res) => {

    Project.findByIdAndDelete(req.params.project_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

//Endpoints Timeline
router.get('/timeline/:project_id', (req, res) => {

    const projectId = req.params.project_id


    Project.findById(projectId, { timeline: 1 })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.put('/timeline/edit/:project_id', (req, res) => {

    const timeline = req.body


    Project.findByIdAndUpdate(req.params.project_id, { timeline })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.post('/timeline/new/:project_id', (req, res) => {

    const projectId = req.params.project_id
    const timeline = req.body


    Project.findByIdAndUpdate(projectId, { timeline })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

// //Endpoints Glossary
// router.get('/project/:project_id/glossary', (req, res) => {

//     const projectId = req.params.project_id


//     Project.findById(projectId, { glossary: 1 })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))

// })

// router.put('/project/:project_id/glossary', (req, res) => {

//     const projectId = req.params.project_id
//     const glossary = req.body


//     Project.findByIdAndUpdate(projectId, { glossary })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))

// })

// //Endpoints Story
// router.get('/project/:project_id/story', (req, res) => {

//     const projectId = req.params.project_id


//     Project.findById(projectId, { story: 1 })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))

// })

// router.put('/project/:project_id/story', (req, res) => {

//     const projectId = req.params.project_id
//     const story = req.body


//     Project.findByIdAndUpdate(projectId, { story })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))

// })





module.exports = router