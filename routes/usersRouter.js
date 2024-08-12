const express = require('express');
// const userModel = require('../models/user-model');
const router = express();
// const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken'); 
// const {generateToken} =require("../utils/generateToken");
const isLoggedin = require("../middleware/isLoggedin");
const userModel = require("../models/user-model");
const {
    registerUser,
    loginUser,
    logout,
} = require("../controllers/authController");
router.get('/', function(req, res){
    res.send("user router")

})

router.post('/register', registerUser);

router.post('/login', loginUser);
router.get('/logout', logout);

router.get("/cart", isLoggedin, async (req, res)=>{
    let user = await userModel.findOne({email: req.user.email}).populate("cart");

    res.render("cart", {user});
})

module.exports = router;