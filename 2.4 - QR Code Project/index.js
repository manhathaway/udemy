/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from 'fs';

inquirer
    .prompt([
        {
            type: 'input',
            name: 'web_url',
            message: 'Enter a website URL:'
        }
    ]).then((answer) => {
        var qr_img = qr.image(answer.web_url, {type: 'png'});
        qr_img.pipe(fs.createWriteStream('input_qr.png'));
    }).catch((error) => {
        console.log(error);
    });