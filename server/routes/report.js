const router = require('express').Router();
let Report = require('../models/report.model');

router.route('/').get(function(req, res) {
    Report.find(function(err, report) {
        if(err) {
            console.log(err);
        } else {
            res.json(report);
        }
    });
});
router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Report.findById(id, function(err, report){
        res.json(report);
    });
});
router.route('/create').post(function(req, res) {
    let report = new Report(req.body);
    report.save()
    .then(report => {
        res.status(200).json({'report': 'report added succesfully'});
    })
    .catch(err => {
        res.status(400).send('adding report failed');
    });
});
router.route('/delete/:id').delete(function(req, res) {
    Report.findByIdAndDelete(req.params.id)
    .then(report => {
        res.json('Report deleted')
    })
    .catch(err => res.status(400).send('deleting report failed'));
});
router.route('/update/:id').post(function(req, res) {
    Report.findById(req.params.id, function(err, report) {
        if(!report)
            res.status(404).send('data not found');
        else
            report.report_who = req.body.report_who;
            report.report_project = req.body.report_project;
            report.report_from = req.body.report_from;
            report.report_to = req.body.report_to;
            report.report_hours = req.body.report_hours;
            
            report.save().then(report => {
                res.json('Report updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible")
            });
    });
});

module.exports = router;