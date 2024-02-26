function makeSound(key) {
    switch (key) {
        case 'w':
            crash.play();
            break;
        case 'a':
            kick.play();
            break;
        case 's':
            snare.play();
            break;
        case 'd':
            tom1.play();
            break;
        case 'j':
            tom2.play();
            break;
        case 'k':
            tom3.play();
            break;
        case 'l':
            tom4.play();
            break;
        default:
            alert(`'${key.toUpperCase()}' is an invalid keypress.`);
    }
}

function changeColor(key) {
    const keyElement = document.querySelector(`.${key}`);
    keyElement.classList.add("pressed");
    setTimeout(function() {
        keyElement.classList.remove("pressed");
    }, 750)
}

const crash = new Audio('./sounds/crash.mp3');
const kick = new Audio('./sounds/kick-bass.mp3');
const snare = new Audio('./sounds/snare.mp3');
const tom1 = new Audio('./sounds/tom-1.mp3');
const tom2 = new Audio('./sounds/tom-2.mp3');
const tom3 = new Audio('./sounds/tom-3.mp3');
const tom4 = new Audio('./sounds/tom-4.mp3');

const buttonArr = document.getElementsByClassName("drum");
for (let i = 0; i < buttonArr.length; i++) {
    buttonArr[i].addEventListener("click", function() {
        makeSound(this.innerHTML);
        changeColor(this.innerHTML);
    });
}

document.addEventListener("keydown", function(event) {
    makeSound(event.key);
    changeColor(event.key);
});