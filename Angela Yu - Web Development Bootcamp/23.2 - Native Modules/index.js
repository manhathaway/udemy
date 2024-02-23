const fs = require("fs");

/*
fs.writeFile("message.txt", "Hello from Node.JS!", function(err) {
    if (err) throw err;
    console.log("File saved.");
});
*/

fs.readFile("./message.txt", "utf-8", function(err, data) {
    if (err) throw err;
    console.log(data);
});