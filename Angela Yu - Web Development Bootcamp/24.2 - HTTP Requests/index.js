import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

app.get("/", (req, res) => {
    res.send("<h1 style='font-weight: bold; color: red'>Homepage</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h2 style='font-style: italic; color: navy'>About Me</h2>");
});

app.get("/contact", (req, res) => {
    res.send("<button id='contact-button' type='button'>Contact Me</button>");
});