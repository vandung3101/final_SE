const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckinHistory = new Schema({
    citizen: { type: String },
    citizenName: { type: String },
    date: { type: Date, default: Date.now },
    checkinBy: { type: String },
})

module.exports = mongoose.model('CheckinHistory', CheckinHistory);