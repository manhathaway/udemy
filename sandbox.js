let family = [
    {
        name: "Alexander Mannoia",
        age: 27,
        occupation: "None"
    },
    {
        name: "Giulia Mannoia",
        age: 29,
        occupation: "Something"
    },
    {
        name: "Kyle Mannoia",
        age: 35,
        occupation: "Graphic Designer"
    }
];


let alex = family.find(x => x.name.split(' ')[0].toLowerCase());

console.log(alex);