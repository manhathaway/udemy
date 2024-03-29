import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let name = "";
let blogs = [];
let counter = false;

app.get("/", (req, res) => {
    try {
        res.render("welcome.ejs");
    } catch (err) {
        res.send(err.message);
    };
});

app.post("/main", (req, res) => {
    try {
        name = req.body.name;
        res.redirect("/index");
    } catch (err) {
        res.send(err.message);
    };
});

app.get("/index", (req, res) => {
    try {
        res.render("main.ejs", {
            name: name,
            blogs: blogs,
            caption: "Write another blog post below.",
            submitAction: "/blog/post",
            submitColor: "primary",
            content: "What's on your mind?",
            counter: counter,
            optionColor: "warning",
            optionText: "⚙",
            optionAction: "/index/toggle_options"
        });
    } catch (err) {
        res.send(err.message);
    };
});

app.post("/blog/post", (req, res) => {
    try {
        blogs.push({
            id: blogs.length + 1,
            content: req.body.content,
            time: new Date().toString(),
            edited: false
        });
        res.redirect("/index");
    } catch (err) {
        res.send(err.message);
    };
});

app.get("/blog/edit/:id", (req, res) => {
    try {
        res.render("main.ejs", {
            name: name,
            blogs: blogs,
            caption: "Let's edit that blog post.",
            submitAction: `/blog/post_edit/${req.params.id}`,
            submitColor: "success",
            content: blogs.find(x => x.id == req.params.id).content,
            counter: counter,
            optionColor: "danger",
            optionText: "✕",
            optionAction: "/index"
        });
    } catch (err) {
        res.send(err.message);
    };
});

app.post("/blog/post_edit/:id", (req, res) => {
    try {
        blogs.find(x => x.id == req.params.id).content = req.body.content;
        blogs.find(x => x.id == req.params.id).time = new Date().toString();
        blogs.find(x => x.id == req.params.id).edited = true;
        res.redirect("/index");
    } catch (err) {
        res.send(err.message);
    };
});

app.get("/blog/delete/:id", (req, res) => {
    try {
        blogs = blogs.filter(x => x.id != req.params.id);
        res.redirect("/index");
    } catch (err) {
        res.send(err.message);
    };
});

app.get("/index/toggle_options", (req, res) => {
    counter = !counter;
    res.redirect("/index");
});

app.listen(port, () => {
    console.log(`Now running on ${port}.`);
});