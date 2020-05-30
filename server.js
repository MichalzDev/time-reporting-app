const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 5000;
const userRoutes = express.Router()
const uri = 'mongodb+srv://Kanban-User:ZAQ%212wsx@kanban-arkwo.mongodb.net/time-reporting-app?retryWrites=true&w=majority'
let User = require('./models/user.model');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
const connection = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database connection established succesfully")
})

userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if(err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user){
        res.json(user);
    });
});
userRoutes.route('/create').post(function(req, res) {
    let user = new User(req.body);
    user.save()
    .then(user => {
        res.status(200).json({'user': 'user added succesfully'});
    })
    .catch(err => {
        res.status(400).send('adding user failed');
    });
});
userRoutes.route('/update/:id').post(function(req, res) {
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
app.use('/users', userRoutes);


app.listen(PORT, function(){
    console.log("Server is running on port: " + PORT);
});