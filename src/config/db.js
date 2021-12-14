const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect(
          "mongodb+srv://admin:%21Rv3F3uCAya45S-@cluster0.txg13.mongodb.net/final-SE?retryWrites=true&w=majority",
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
        );
        console.log('Connect successfully!')
    } catch (e) {
        console.log('Connect failure!')
    }
}

module.exports = { connect }