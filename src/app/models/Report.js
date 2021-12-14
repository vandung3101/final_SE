const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Report = new Schema({
    name : { type: String },
    description : { type: String },
    date : { type: Date, default: Date.now },
    createdBy : { type: String },
    url : { type: String },
});

module.exports = mongoose.model("Report", Report);
