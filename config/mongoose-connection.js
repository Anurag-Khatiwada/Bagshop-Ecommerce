const mongoose = require("mongoose");
const config = require('config');



mongoose
.connect(process.env.MONGO_URI)

.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;