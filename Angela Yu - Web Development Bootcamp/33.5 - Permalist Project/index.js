import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "webdevlife",
  port: 5432
});

db.connect();

app.get("/", async (req, res) => {
  try {
    const list = await db.query('SELECT * FROM list;');

    res.render("index.ejs", {
      listTitle: "My To-Do List",
      listItems: list.rows
    });
  } catch (err) {
    console.log(err);
    res.send("Couldn't fetch list.")
  };
});

app.post("/add", (req, res) => {
  try {
    db.query('INSERT INTO list (title) VALUES ($1);', [req.body.newItem]);

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.send('INSERT query failed.');
  };
});

app.post("/edit", (req, res) => {
  try {
    db.query('UPDATE list SET title = ($1) WHERE id = ($2)', [req.body.updatedItemTitle, req.body.updatedItemId])

    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.send('UPDATE query failed.');
  };
});

app.post("/delete", (req, res) => {
  try {
    db.query('DELETE FROM list WHERE id = ($1)', [req.body.deleteItemId]);

    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.send('DELETE query failed.');
  };
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});