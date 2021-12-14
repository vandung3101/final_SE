const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/final_cnpm", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect successfully!')
    } catch (e) {
        console.log('Connect failure!')
    }
}

module.exports = { connect }