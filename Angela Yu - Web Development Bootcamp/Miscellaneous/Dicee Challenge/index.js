function assignImg(num, element) {
    if (num == 1) {
        element.setAttribute("src", "./images/dice1.png");
    } else if (num == 2) {
        element.setAttribute("src", "./images/dice2.png");
    } else if (num == 3) {
        element.setAttribute("src", "./images/dice3.png");
    } else if (num == 4) {
        element.setAttribute("src", "./images/dice4.png");
    } else if (num == 5) {
        element.setAttribute("src", "./images/dice5.png");
    } else {
        element.setAttribute("src", "./images/dice6.png");
    }
}

let n_1 = Math.round((Math.random() * 5) + 1);
let n_2 = Math.round((Math.random() * 5) + 1);

const img1 = document.querySelector(".img1");
const img2 = document.querySelector(".img2");

assignImg(n_1, img1);
assignImg(n_2, img2);

const result = document.querySelector(".result");
if (n_1 > n_2) {
    result.innerHTML = "PLAYER 1 WINS!";
} else if (n_1 < n_2) {
    result.innerHTML = "PLAYER 2 WINS!";
} else {
    result.innerHTML = "IT'S A DRAW";
}