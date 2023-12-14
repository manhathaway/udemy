import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("welcome.ejs");
});

app.post("/main", (req, res) => {
    res.render("main.ejs", {
        name: req.body.name
    });
});

let blogs = [];

function deleteBlog() {
    console.log("Button Working");
};

app.post("/blogged", (req, res) => {
    blogs.push(req.body.blogPost);
    res.render("main.ejs", {
        blogs,
        deleteBlog
    })
});

app.listen(port, () => {
    console.log(`Now running on ${port}.`);
});