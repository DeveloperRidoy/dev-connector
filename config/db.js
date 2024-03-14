const mongoose = require('mongoose');
const db = process.env.mongoURI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
            useCreateIndex: true,
          useFindAndModify: true
        });
        console.log('db connected...');
    } catch (error) {
        console.log(error.message);
        // exit process with failure
        process.exit(1);
    }
}
 
module.exports = connectDB