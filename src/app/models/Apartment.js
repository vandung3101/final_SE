const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Apartment = new Schema({
    floor_number: { type: String },
    department_number: { type: String },
    account: { type: String },
    people: {type: String},
    fee: { type: Number },
    description: { type: String },
});


module.exports = mongoose.model('Apartment', Apartment);