import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

let type;
let content;
let border;
let counter = 1;
let index = 0;

let filterType = null;
let embarassingScore = null;
let date = null;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    type: type,
    content: content,
    border: border,
    filterType: filterType,
    embarassingScore: embarassingScore,
    date: date,
    counter: counter,
    index: index
  });
});

app.get("/random", async (req, res) => {
  type = 'random';
  border = "border-bottom: 10px solid #4EB8FF";
  content = await axios.get(API_URL + "random");

  res.redirect("/");
});

app.get("/all", async (req, res) => {
  type = 'filter';
  border = "border-bottom: 10px solid #2CEB7D";
  content = await axios.get(API_URL + "filter", {
    params: {
      apiKey: "c4f8a446-a492-4065-916a-5282f4a2c8e6"
    }
  });

  res.redirect("/");
});

app.get("/all_clear", (req, res) => {
  counter = 1;
  index = 0;

  filterType = null;
  embarassingScore = null;
  date = null;

  res.redirect("/all");
})

app.post("/all_filter", (req, res) => {
  counter = 1;

  if (req.body.embarassingScore) {
    embarassingScore = req.body.embarassingScore;
  } else if (req.body.date) {
    date = req.body.date;
  } else {
    console.log('[More Filters]');
  }

  res.redirect("/all");
});

app.post("/all_filter_select", (req, res) => {
  index = 0;

  filterType = req.body.filterType;

  res.redirect("/all");
});

app.get("/decrement", (req, res) => {
  index = index - 1;

  res.redirect("/all");
});

app.get("/increment", (req, res) => {
  index = index + 1;

  res.redirect("/all");
});

app.get("/prevPage", (req, res) => {
  counter = counter - 1;

  res.redirect("/");
})

app.get("/nextPage", (req, res) => {
  counter = counter + 1;

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
