const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notification = new Schema({
    title: { type: String },
    content: { type: String },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', Notification);