const express = require('express');
const router = express();

router.get('/', function(req, res){
    res.send("user router")

})

module.exports = router;