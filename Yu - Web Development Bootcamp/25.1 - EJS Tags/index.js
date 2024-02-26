import express from 'express';

let port = 3000;
let app = express();

app.get("/", (req, res) => {
    res.render("index.ejs", {
        title: "EJS Tags",
        seconds: new Date().getSeconds(),
        items: ["apple", "bannana", "cherry"],
        htmlContent: "<em>This is some emphasized text</em>"
    });
});

app.listen(port, () => {
    console.log(`Running on port: ${port}.`);
});