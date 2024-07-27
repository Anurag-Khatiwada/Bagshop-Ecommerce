const express = require('express');
const router = express();

router.get('/', function(req, res){
    res.send("product router");
})

module.exports = router;