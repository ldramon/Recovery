const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const connectDB = async () => {

    try {

        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('Connected DB');
        
    } catch (error) {
        console.log(error);
        process.exit(1); // We stop the app
    }

}

module.exports = connectDB