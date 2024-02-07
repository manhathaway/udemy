import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from 'express-session';
import passport from "passport";
import { Strategy } from "passport-local";
import env from 'dotenv';

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  host: 'localhost',
  user: 'postgres',
  password: 'webdevlife',
  database: 'login_system',
  port: 5432
});

db.connect();

let users;
let emails;
let error;

const updateData = async () => {
  users = await db.query('SELECT * FROM users');
  emails = users.rows.map(user => user.email);
};

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", async (req, res) => {
  try {
    await updateData();

    res.render("login.ejs", {
      error: error
    });
  } catch (err) {
    console.log(err)
    res.send('Backend error (fetching data).');
  };
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login"
}));

app.get("/register", async (req, res) => {
  try {
    await updateData();

    res.render("register.ejs", {
      error: error
    });
  } catch (err) {
    console.log(err)
    res.send('Backend error (fetching data).');
  };
});

app.post("/register", async (req, res) => {
  if (emails.includes(req.body.username)) {
    error = "Email already registered";
    res.redirect('/register');
  } else {
    error = null;
    try {
      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        if (err) {
          console.log(err);
          res.send('Backend error (hashing password).');
        } else {
          const result = await db.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;',
            [req.body.username, hash]);
          
          const user = result.rows[0];
          req.login(user, (err) => {
            if (err) {
              console.log(err);
            } else {
              res.redirect('/secrets');
            };
          });
        };
      });
    } catch (err) {
      console.log(err)
      res.send('Backend error (inserting data).');
    };
  };
});

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets.ejs")
  } else {
    res.redirect('/login');
  };
});

passport.use(new Strategy(
  function verify(username, password, cb) {
    if (emails.includes(username)) {
      const user = users.rows.filter(user => user.email == username)[0];
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          return cb(err);
        } else {
          if (result) {
            error = null;
            return cb(null, user)
          } else {
            error = "Incorrect password.";
            return cb(null, false)
          };
        };
      });
    } else {
      error = "No such email registered.";
      return cb(null, false);
    };
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}/`);
});