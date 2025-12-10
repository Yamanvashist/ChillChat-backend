const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const connect = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo Db connected successfully")
    }catch (err){
        console.log("Mongo db error")
    }
}

module.exports = connect