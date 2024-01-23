import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
let result = "Enter your birthdate to begin.";
let month;
let day;
let year;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        month: month,
        day: day,
        year: year,
        result: result
    });
});

app.post("/send-data", (req, res) => {
    month = req.body.month;
    day = req.body.day;
    year = req.body.year;
    
    result = specificAge(`${month} ${day} ${year}`);

    res.redirect("/");
});

app.listen(port, (err) => {
    if (err) {
        console.log("Error, couldn't establish server.");
    } else {
        console.log("Server running on " + port);
    };
});

const specificAge = (date) => {
    // Formatting the user's birthday.
    const birthdateArr = date.split(' ');
    const birthMonth = birthdateArr[0].slice(0, 3);
    const birthDay = Number(birthdateArr[1].replace(/\D/g,''));
    const birthYear = Number(birthdateArr[2]);
    const birthDate = [birthMonth, birthDay, birthYear];


    // Getting and formatting the current date.
    let newDate = new Date().toString().slice(4, 15).split(' ');
    const currentMonth = newDate[0];
    const currentDay = Number(newDate[1][0] == 0 ? newDate[1][1] : newDate[1]);
    const currentYear = Number(newDate[2]);
    const currentDate = [currentMonth, currentDay, currentYear];
    
    // Months of the year, sorted as objects in an array.
    const months = [
        {
            name: 'Jan',
            days: 31
        },
        {
            name: 'Feb',
            days: 29
        },
        {
            name: 'Mar',
            days: 31
        },
        {
            name: 'Apr',
            days: 30
        },
        {
            name: 'May',
            days: 31
        },
        {
            name: 'Jun',
            days: 30
        },
        {
            name: 'Jul',
            days: 31
        },
        {
            name: 'Aug',
            days: 31
        },
        {
            name: 'Sep',
            days: 30
        },
        {
            name: 'Oct',
            days: 31
        },
        {
            name: 'Nov',
            days: 30
        },
        {
            name: 'Dec',
            days: 31
        }
    ];
    
    // Calculates the difference in days between the user's birthday and the last day of that month.
    let totalDays = months.filter(x => x.name == birthMonth)[0].days - birthDay;
    
    // Calculates the difference in months between the user's birth month and the last month of the year.
    let totalMonths = 0;
    for (let i = 0; i < months.length; i++) {
        if (birthMonth !== months[i].name) {
            continue;
        } else {
            i = i + 1;
            for (i; i < months.length; i++) {
                totalMonths = totalMonths + 1;
            };
        };
    };

    // Calculates how old the user is in years.
    let totalYears = currentYear - birthYear - 1;
    
    // Calculates how many months have elapsed since the first month of the year.
    for (let i = 0; i < months.length; i++) {
        if (currentMonth !== months[i].name.slice(0, 3)) {
            totalMonths = totalMonths + 1;
        } else {
            break;
        };
    };

    // Adds to 'totalDays' the days that have elapsed within the current month.
    totalDays = totalDays + currentDay;

    // Converts days to months and months to years.
    if (months.findIndex(month => month.name == currentMonth) == 0) {
        if (totalDays >= months[months.findIndex(month => month.name == 'Dec')].days) {
            totalDays = totalDays - months[months.findIndex(month => month.name == 'Dec')].days;
            totalMonths = totalMonths + 1;
        };
    } else {
        if (totalDays >= months[months.findIndex(month => month.name == currentMonth) - 1].days) {
            totalDays = totalDays - months[months.findIndex(month => month.name == currentMonth) - 1].days;
            totalMonths = totalMonths + 1;
        };
    };

    if (totalMonths >= 12) {
        totalMonths = totalMonths - 12;
        totalYears = totalYears + 1;
    };
    
    // Handles results.
    if (birthDay > months.filter(month => month.name == birthMonth)[0].days) {
        return "Not a valid day.";
    } else if (birthYear > currentYear) {
        return "You're gonna be born some time in the future!";
    } else if (birthYear == currentYear && months.findIndex(month => month.name == birthMonth) > months.findIndex(month => month.name == currentMonth)) {
        return "You're gonna be born this year!";
    } else if (birthYear == currentYear && birthDay > currentDay) {
        return "You're gonna be born this month!";
    } else {
        if (totalYears == 0) {
            if (totalMonths ==  0 && totalDays == 0) {
                return `You were born today.`;
            } else if (totalMonths == 0) {
                return `You were born ${totalDays} ${totalDays > 1 ? "days": "day"} ago.`
            } else if (totalDays == 0) {
                return `You were born ${totalMonths} ${totalMonths > 1 ? "months": "month"} ago.`;
            } else {
                return `You were born ${totalMonths} ${totalMonths > 1 ? "months": "month"} and ${totalDays} ${totalDays > 1 ? "days": "day"} ago.`;
            };
        } else {
            if (totalMonths == 0 && totalDays == 0) {
                return `You were born ${totalYears} ${totalYears > 1 ? "years": "year"} ago.`;
            } else if (totalMonths == 0) {
                return `You were born ${totalYears} ${totalYears > 1 ? "years": "year"} and ${totalDays} ${totalDays > 1 ? "days": "day"} ago.`;
            } else if (totalDays == 0) {
                return `You were born ${totalYears} ${totalYears > 1 ? "years": "year"} and ${totalMonths} ${totalMonths > 1 ? "months": "month"} ago.`;
            } else {
                return `You were born ${totalYears} ${totalYears > 1 ? "years": "year"}, ${totalMonths} ${totalMonths > 1 ? "months": "month"} and ${totalDays} ${totalDays > 1 ? "days": "day"} ago.`;
            };
        };
    };
};