import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;
let countries = []

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: 'postgres',
  password: 'webdevlife',
  database: 'world',
  host: 'localhost',
  port: 5432
});

app.get("/", async (req, res) => {
  db.connect();
  const result = await db.query('SELECT * FROM visited_countries');

  res.render("index.ejs", {
    total: result.rows.length,
    countries: result.rows.map(country => country.country_code)
  })
  db.end();
});

app.post('/add', async (req, res) => {
  console.log(req.body.country);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
