// let and const

//ES5
// var nameES5 = 'Jane Smith';
// var ageES5 = 23;
// nameES5 = 'Jane Miller';
// console.log(nameES5);

// //ES6
// const nameES6 = 'Jane Smith';
// let ageES6 = 23;
// nameES6 = 'Jane Miller'; // cause error

// //ES5
// function driversLicenseES6(passedTest) {
//     if (passedTest){
//         var firstName = 'John';
//         var yearOfBirth = 1990;        
//     }
//     console.log(`${firstName} born in ${yearOfBirth}, is now officially allowed to drive a car.`);
// }
// driversLicenseES6(true);

// //ES6
// function driversLicenseES6(passedTest) {
//     if (passedTest){
//         let firstName = 'John'; //this will deallocate after if block
//         const yearOfBirth = 1990;
//         console.log(`${firstName} born in ${yearOfBirth}, is now officially allowed to drive a car.`);
//     }
// }
// driversLicenseES6(true);

// let i = 23;
// for (let i = 0; i < 5; i++){
//     console.log(i); // does not affect the i outside of for loop, shadowing?
// }
// console.log(i);

/////////////////////////////////////////////////////////////////////////////
// Blocks and IIFEs
{
    const a = 1;
    let b = 2;
}
//console.log(a + b); // undefined

/////////////////////////////////////////////////////////////////////////////
// strings - backticks (template literals)

// let firstName = 'John';
// let lastName = 'Smith'
// const yearOfBirth = 1990;
// console.log(`${firstName} ${lastName} was born in ${yearOfBirth}`);

// const fullName = `${firstName} ${lastName}`;

// // new methods
// fullName.startsWith('J'); // returns bool, case senstive match
// fullName.endsWith('th'); // returns true--bool
// fullName.includes(' '); // returns true, there is a space in the middle
// fullName.repeat(5); //John SmithJohn SmithJohn SmithJohn SmithJohn Smith

/////////////////////////////////////////////////////////////////////////////
// arrow functions

const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function (el) {
    return 2016 - el;
});

//ES6
let ages6 = years.map(el => 2016 - el); // no function, return, braces, parenthesis

ages6 = years.map((el, index) => `Age element ${index + 1} : ${2016 - el}`);

ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1} : ${age}.`;
});