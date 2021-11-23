const express = require("express");
const router = express.Router();
const db = require("../services/db");
const passport = require("passport")

const bcrypt = require("bcrypt");
const saltRounds = 10
const uuidv4 = require("uuid")

//login
router.post("/login", passport.authenticate('local'), (req, res) => {
    res.status(200).send({ message: `uuid: ${req.user.uuid}, name: ${req.user.name}`});
})

//register //notyetdone
router.post("/register", (req, res) => {
    console.log(req.user)
    if(req.user && req.user.superadmin == 'true'){
        const name = req.body.name;
        const username = req.body.username;
        const password = req.body.password;  
        const uuid = uuidv4.v4();      
        const superadmin = req.body.superadmin;
        const admin = req.body.admin;
        const support = req.body.support;
        const marketing = req.body.marketing;

        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) throw err;
            let sql = `INSERT INTO user (name, username, password, uuid, superadmin, admin, support, marketing) VALUE (?,?,?,?,?,?,?,?)`;
            let query = db.query(sql, [name, username, hash, uuid, superadmin, admin, support, marketing], (err, result) => {
                if (err) throw err;
                console.log('Registered...');
                console.log(uuid)
                res.json(result)
            })
        })
    }else{
        res.status(403).send({ message: 'not authenticated'})
    }
})

//change password //for everyone
router.put("/changepassword", (req, res) => {
    if(req.user){
        if(req.body.oldpassword == req.user.password && req.body.username == req.user.username){
                const newpassword = req.body.newpassword;

                bcrypt.hash(newpassword, saltRounds, (err, hash) => {
                    if (err) throw err;
                    let sql = `UPDATE user SET password = '${hash}' WHERE uuid = ${req.user.uuid}`;
                    let query = db.query(sql, (err, result) => {
                        if (err) throw err;
                        console.log('Password updated...');
                        res.json(result)
                    })
                })
            }else{
                res.status(403).send({ message: 'invalid username or password'})
            }            
        }else{
            res.status(403).send({ message: 'not authenticated'})
        }
})

router.post("/logout", (req, res) => {
    req.logout();
    res.json({ message: 'logout successful' }); 
    console.log("logout successful")   
})

module.exports = router;