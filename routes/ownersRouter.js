const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

if( process.env.NODE_ENV ==="development"){
    router.post('/create', async function(req, res){
        let owners = await ownerModel.find();
        if(owners.length > 0){
            res.send("you can't create an owner");
        }
        let {fullname, email, password} = req.body;

        let createdOwner = await ownerModel.create({
                fullname,
                email,
                password,

        })
        res.status(201).send(createdOwner)
       
    })
}

router.get('/admin', function(req, res){
    let success = req.flash("success");
    res.render("createproduct", {success});

})


module.exports = router;