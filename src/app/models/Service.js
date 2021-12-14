const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Service = new Schema({
    citizen: { type: String },
    type: { type: String },
    price: { type: Number },
    content: { type: String },
    status: { type: String },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Service', Service);