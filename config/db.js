const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

/*
for local dev use:
const db = config.get('mongoURI_local')
*/

const connectDB = async () => {
  try{
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }).then(() =>{
      console.log("MongoDB connected.")
    })
    
  }catch(err){
    console.log(err.message)
    process.exit(1) //exit with failure
  }
}

module.exports = connectDB