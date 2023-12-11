import express from 'express';

let app = express();
let port = 3000;
let date = new Date("January 6, 2024 11:00.00");

app.get("/", (req, res) => {
    res.render("index.ejs", {
        dayType: convertDay(date.getDay()),
        advice: giveAdvice(date.getDay())
    });
});

app.listen(port, () => {
    console.log(`Now running on ${port}.`);
});

const convertDay = (obj) => {
    switch (obj) {
        case 0:
            return "sunday";
            break;
        case 1:
            return "monday";
            break;
        case 2:
            return "tuesday";
            break;
        case 3:
            return "wednesday";
            break;
        case 4:
            return "thursday";
            break;
        case 5:
            return "friday";
            break;
        case 6:
            return "saturday";
            break;
    }
};

const giveAdvice = (obj) => {
    if (obj == 0 || obj == 6) {
        return "time to have fun!";
    } else {
        return "time to work hard!";
    }
};