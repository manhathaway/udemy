import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

const config = {
  headers: { Authorization: "Bearer 62150bfd-f7fa-4002-af78-ff44f883b3ca" },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const id = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + id, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  const data = {
    secret: req.body.secret,
    score: req.body.score
  };
  
  try {
    const result = await axios.post(API_URL + "/secrets/", data, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
  const id = req.body.id;
  const data = {
    secret: req.body.secret,
    score: req.body.score
  };
  try {
    const result = await axios.put(API_URL + "/secrets/" + id, data, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/patch-secret", async (req, res) => {
  const id = req.body.id;
  const data = {
    secret: req.body.secret,
    score: req.body.score
  };

  try {
    const result = await axios.patch(API_URL + "/secrets/" + id, data, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/delete-secret", async (req, res) => {
  const id = req.body.id;

  try {
    const result = await axios.delete(API_URL + "/secrets/" + id, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) })
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
