import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let type;
let participants;
let userResults;
let userResult;

app.get("/", async (req, res) => {
  try {
    const randResponse = await axios.get("https://bored-api.appbrewery.com/random");
    const randResult = randResponse.data;

    if (userResult) {
      res.render("index.ejs", { result: userResult });
    } else {
      res.render("index.ejs", { result: randResult });
    };
  
  } catch (error) {
    if (userResult) {
      res.render("index.ejs", { result: userResult });
    } else {
      console.error(error.message, "- backend error.");
      userResult = {
        activity: "Backend error, try again",
        type: "N/A",
        participants: "N/A"
      };
      res.render("index.ejs", { result: userResult });
    };
  }
});

app.post("/input", async (req, res) => {
  try {
    type = req.body.type;
    participants = req.body.participants;
    
    userResults = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`);
    userResult = userResults.data[Math.floor(Math.random() * userResults.data.length)];
  } catch (error) {
    console.error(error.message, "- no activities found.");
    userResult = {
      activity: "No activities found, try again",
      type: "N/A",
      participants: "N/A"
    };
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
