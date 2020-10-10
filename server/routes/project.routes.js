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




// router.get('/all-projects/results', (req, res) => {

// const queryResults = req.query.results

// Project.find({querys result})
//     .then(response => res.json(response))
//     .catch(err => res.status(500).json(err))
// })


module.exports = router