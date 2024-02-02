import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "webdevlife",
  port: 5432,
});

db.connect();

let currentUser;
let error;

app.get("/", async (req, res) => {
  const usersRequest = await db.query('SELECT * FROM users');
  const users = usersRequest.rows;

  if (users.length == 0) {
    res.redirect('/new');
  } else {
    const dataRequest = await db.query('SELECT country_code, user_id, name, color FROM visited_countries JOIN users ON users.id = user_id');
    const data = dataRequest.rows;

    let output;
    if (typeof currentUser == 'number') {
      output = data.filter(entry => entry.user_id == currentUser);
    } else {
      output = data;
    };

    res.render("index.ejs", {
      data_codes: output.map(entry => entry.country_code),
      data_colors: output.map(entry => entry.color),
      data_length: output.length,
      users: users,
      currentUser: currentUser,
      error: error
    });
  };
});

app.post("/add", async (req, res) => {
  try {
    const countriesRequest = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'", [req.body.country.toLowerCase()]);
    const countryCode = countriesRequest.rows[0].country_code;

    if (typeof currentUser == 'number') {
      error = null;
      try {
        await db.query(
          "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
          [countryCode, currentUser]
        );
      } catch (err) {
        console.log("Error adding country: ", err);
      };
    } else {
      error = "Select a user to add a country.";
    };
  } catch {
    error = "Couldn't find country.";
  };

  res.redirect(`/user/${currentUser}`);
});

app.post("/user", async (req, res) => {
  if (req.body.user) {
    req.body.user == 'all' ?
      res.redirect('/all') : res.redirect(`/user/${req.body.user}`);
  } else {
    res.redirect('/new');
  };
});

app.get('/all', (req, res) => {
  currentUser = null;

  res.redirect('/');
})

app.get("/user/:id", async (req, res) => {
  currentUser = parseInt(req.params.id);

  res.redirect('/');
});

app.get("/new", (req, res) => {
  res.render('new.ejs');
});

app.post("/new", async (req, res) => {
  await db.query('INSERT INTO users (name, color) VALUES ($1, $2)', [req.body.name, req.body.color]);

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});