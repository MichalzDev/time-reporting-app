const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if(err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});
router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user){
        res.json(user);
    });
});
router.route('/create').post(function(req, res) {
    let user = new User(req.body);
    user.save()
    .then(user => {
        res.status(200).json({'user': 'user added succesfully'});
    })
    .catch(err => {
        res.status(400).send('adding user failed');
    });
});
router.route('/delete/:id').delete(function(req, res) {
    User.findByIdAndDelete(req.params.id)
    .then(user => {
        res.json('User deleted')
    })
    .catch(err => res.status(400).send('deleting user failed'));
});
router.route('/update/:id').post(function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if(!user)
            res.status(404).send('data not found');
        else
            user.user_login = req.body.user_login;
            user.user_password = req.body.user_password;
            user.user_name = req.body.user_name;
            user.user_role = req.body.user_role;
            user.user_projects = req.body.user_projects;
            user.user_permissions = req.body.user_permissions;
            
            user.save().then(user => {
                res.json('User updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible")
            });
    });
});

module.exports = router;