const mongoose= require('mongoose');
const mongoURL="mongodb://127.0.0.1:27017/inotebook?directConnection=true ";
mongoose.set('strictQuery',false);
const connectmongo=()=>{
    mongoose.connect(mongoURL,()=>{
        console.log(" connected to mongodb");
    })
}

module.exports=connectmongo;