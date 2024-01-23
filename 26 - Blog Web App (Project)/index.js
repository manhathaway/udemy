import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let name = "";
let blogs = [];

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
            action: "/blog/post",
            buttonColor: "primary",
            content: "What's on your mind?"
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
            action: `/blog/post_edit/${req.params.id}`,
            buttonColor: "success",
            content: blogs.find(x => x.id == req.params.id).content
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

app.listen(port, () => {
    console.log(`Now running on ${port}.`);
});