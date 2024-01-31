import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;
let countries = []
let error;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: 'postgres',
  password: 'webdevlife',
  database: 'world',
  host: 'localhost',
  port: 5432
});

db.connect();

db.query('SELECT * FROM countries', (err, res) => {
  if (err) {
    console.log("Error fetching countries:", err);
  } else {
    countries = res.rows;
  };
});

app.get("/", async (req, res) => {
  try {
    const visited_countries = await db.query('SELECT * FROM visited_countries');
    res.render("index.ejs", {
      total: visited_countries.rows.length,
      countries: visited_countries.rows.map(country => country.country_code),
      error: error
    });
  } catch (err) {
    console.log("Error at GET request:", err);
  }
});

app.post('/add', async (req, res) => {
  const country = countries.find(country => country.country_name.includes(req.body.country));

  if (typeof country == 'object') {
    try {
      await db.query(`INSERT INTO visited_countries(country_code) VALUES('${country.country_code}')`);
    } catch (err) {
      error = "Country already added.";
    };
  } else {
    error = "No such country exists.";
  };

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
