const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const db = require("../services/db");
const bcrypt = require("bcrypt");

//serialize into session
passport.serializeUser((user, done) => [
    done(null, user.uuid)
])

passport.deserializeUser(async (uuid, done) => {
    try{
        const result = await db.promise().query(`SELECT * FROM user WHERE uuid = '${uuid}'`);
        if(result[0][0]){
            console.log("deserialize")
            console.log(result[0][0])
            console.log("deserialized result above")
            done(null, result[0][0])
        }
    }catch(err){
        done(err, null)
    }
})

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try{
            const result = await db.promise().query(`SELECT * FROM user WHERE username = '${username}'`);
            if (result[0].length > 0){
                bcrypt.compare(password, result[0][0].password, (err, response) => {
                    if(response){
                        done(null, result[0][0])
                        console.log("login successful")
                    }else{
                        done(null, false)
                    }
                })
            }else{
                done(null, false)
            }
        }catch(err){
            done(err, false)
        }            
    }
))

