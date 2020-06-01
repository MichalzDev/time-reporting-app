const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Project = new Schema({
    project_name:{
        type: String
    },
    project_members:{
        type: []
    },
});

module.exports = mongoose.model('Project', Project)