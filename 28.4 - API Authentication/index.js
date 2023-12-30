import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";
let content;
let counter = 1;

app.use(express.static("public"));

app.get("/", (req, res) => {
  try {
    res.render("index.ejs", {
      content: content,
      counter: counter
    });
  } catch(error) {
    console.log(error.message);
  }
});

app.get("/noAuth", async (req, res) => {
  content = await axios.get(API_URL + "random");

  res.redirect("/");
});

app.get("/basicAuth", async (req, res) => {
  content = await axios.get(API_URL + "all", {
      auth: {
        username: "puccino",
        password: "puccinozione",
      },
      params: {
        page: 1
      }
  });

  res.redirect("/");
});

app.get("/apiKey", async (req, res) => {
  content = await axios.get(API_URL + "filter", {
    params: {
      score: 5,
      apiKey: "c4f8a446-a492-4065-916a-5282f4a2c8e6"
    }
  });

  res.redirect("/");
});

app.get("/bearerToken", async (req, res) => {
  content = await axios.get(API_URL + "secrets/42", {
    headers: {
      Authorization: "Bearer 45d01428-ec29-47d6-9d3c-82658ebdd0a5"
    }
  });

  res.redirect("/");
});

app.get("/page", (req, res) => {
  counter = 1;

  res.redirect("/basicAuth");
});

app.get("/filter", (req, res) => {
  counter = 1;

  res.redirect("/apiKey");
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
