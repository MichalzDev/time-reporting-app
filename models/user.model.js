const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    user_login:{
        type: String
    },
    user_password:{
        type: String
    },
    user_name:{
        type: String
    },
    user_role:{
        type: String
    },
    user_project:{
        type: []
    },
    user_permissions:{
        type: String
    },
});

module.exports = mongoose.model('User', User)