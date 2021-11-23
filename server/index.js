const express = require("express");
const cors = require("cors")
const users = require("./apis/user")
const session = require("express-session");
const passport = require("passport");
const local = require("./strategies/local")

const app = express()

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
    })
);
app.use(express.json());
app.use(express.urlencoded());

app.use(session({
    name: "id",
    key: 'session_cookie_name',
	secret: 'cmsforziyaad',
	resave: false,
	saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 10,
        sameSite: true
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", users);


app.listen(5000, () => {
    console.log(`Server is running on 5000`);
});
