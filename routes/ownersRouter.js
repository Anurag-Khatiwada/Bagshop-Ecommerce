const express = require('express');
const router = express();

router.get('/', function(req, res){
    res.send("hey");
})

module.exports = router;