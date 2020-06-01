const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Report = new Schema({
    report_who:{
        type: String
    },
    report_project:{
        type: String
    },
    report_from:{
        type: Date
    },
    report_to:{
        type: Date
    },
    report_hours:{
        type: String
    }
});

module.exports = mongoose.model('Report', Report)