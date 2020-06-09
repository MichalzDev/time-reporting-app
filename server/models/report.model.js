const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Report = new Schema({
  report_who: {
    type: String,
  },
  report_project: {
    type: String,
  },
  report_from: {
    type: String,
  },
  report_hours: {
    type: Number,
  },
  report_status: {
    type: String,
  },
});

module.exports = mongoose.model("Report", Report);
