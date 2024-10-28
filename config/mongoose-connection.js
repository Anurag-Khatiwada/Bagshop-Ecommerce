const mongoose = require("mongoose");
const config = require('config');

const dbgr = require("debug") ("development:mongoose");

mongoose
.connect(process.env.MONGO_URI)
.then(function(){
    dbgr("connected");
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;