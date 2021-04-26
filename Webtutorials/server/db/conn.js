const mongoose = require('mongoose');

const DB = process.env.DATABASE; //to hide for being live

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connection successfull mongodb says")
}).catch((error) => {
    console.log(error)
})