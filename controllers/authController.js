const userModel = require('../models/user-model');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;
        let find = await userModel.findOne({ email });
        if (!find) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, async function (err, hash) {
                    if (err) return res.send(err.message);
                    else {
                        let user = await userModel.create({
                            fullname,
                            email,
                            password: hash
                        });
                        let token = generateToken(user);
                        res.cookie("token", token, { httpOnly: true });
                        res.send("user created successfully");
                    }
                });
            });
        } else {
            res.send("user already exists");
        }
    } catch (err) {
        res.send(err.message);
    }
}

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
        req.flash("error", "Email or Password incorrect");
        return res.redirect("/");
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token, { httpOnly: true });
            res.redirect("/shop");
        } else {
            req.flash("error", "Email or Password incorrect");
            res.redirect("/");
        }
    });
}

module.exports.logout = async (req, res) => {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.redirect("/");
}
