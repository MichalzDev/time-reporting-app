const router = require('express').Router();
let Project = require('../models/project.model');

router.route('/').get(function(req, res) {
    Project.find(function(err, project) {
        if(err) {
            console.log(err);
        } else {
            res.json(project);
        }
    });
});
router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Project.findById(id, function(err, project){
        res.json(project);
    });
});
router.route('/create').post(function(req, res) {
    let project = new Project(req.body);
    project.save()
    .then(project => {
        res.status(200).json({'project': 'project added succesfully'});
    })
    .catch(err => {
        res.status(400).send('adding project failed');
    });
});
router.route('/delete/:id').delete(function(req, res) {
    Project.findByIdAndDelete(req.params.id)
    .then(project => {
        res.json('Project deleted')
    })
    .catch(err => res.status(400).send('deleting project failed'));
});
router.route('/update/:id').post(function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if(!project)
            res.status(404).send('data not found');
        else
            project.project_name = req.body.project_name;
            project.project_members = req.body.project_members;
            
            project.save().then(project => {
                res.json('Project updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible")
            });
    });
});

module.exports = router;