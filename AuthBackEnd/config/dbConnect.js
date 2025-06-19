const mongoose = require('mongoose');

exports.dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(`DB Connected with : ${mongoose.connection.host}`);
    }
    catch(e) {
        console.log(e);
    }
}