import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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

app.post("/login", (req, res) => {
  if (emails.includes(req.body.username)) {
    const user = users.rows.filter(user => user.email == req.body.username)[0];
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        console.log(err);
        res.send('Backend error (checking password).');
      } else {
        if (result) {
          error = null;
          res.redirect('/secrets');
        } else {
          error = "Incorrect password.";
          res.redirect('/login');
        };
      };
    });
  } else {
    error = "No such email registered.";
    res.redirect('/login');
  };
});

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

app.post("/register", (req, res) => {
  if (emails.includes(req.body.username)) {
    error = "Email already registered";
    res.redirect('/register');
  } else {
    error = null;
    try {
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
          res.send('Backend error (hashing password).');
        } else {
          db.query(
            'INSERT INTO users (email, password) VALUES ($1, $2);',
            [req.body.username, hash]);
          
          res.redirect('/secrets');
        };
      });
    } catch (err) {
      console.log(err)
      res.send('Backend error (inserting data).');
    };
  };
});

app.get("/secrets", (req, res) => {
  res.render("secrets.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}/`);
});