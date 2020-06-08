/****4 Function constructor  */

//blueprint for person
//always write function constructor with captial, 'P'
// var Person = function (name, yearOfBirth, job) {  
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
//     this.calculateAge = function () {
//         console.log(2016 - this.yearOfBirth);
//     }
// };

// // inheritence
// // add newCalculateAge method to Person
// Person.prototype.newCalculateAge = function () {
//     console.log(`newCalculateAge(): ${this.name} ${this.lastName}, age:${2016 - this.yearOfBirth}`);
// };
// // make all Person's last name to 'Smith
// Person.prototype.lastName = 'Smith';

// var john = new Person('John', 1990, 'teacher');
// /*
// 1. empbty object is created
// 2. function Person is called
// 3. new execution context since a function is called
// 4. this variable is set to point to Person since new execution context
// 5. new operator makes it so that this variable points to new empty object rather than global object
// 6. since constructor did not return anything, the result is the object that was created in 1.
// 7. assign to john variable
// */

// var jane = new Person('Jane', 1969, 'designer');
// var mark = new Person('Mark', 1948, 'retired');
// // john.newCalculateAge();
// // jane.newCalculateAge();
// // mark.newCalculateAge();
// //console.log(john);
// var bHas = john.hasOwnProperty('job'); // returns true
// var bHas1 = john.hasOwnProperty('lastName'); // returns false, lastName property is inherited (belongs to Person)
// // test if an object is inheritted from another object
// john instanceof Person ;  // true


// /****6 Object.create method *********/
// // define an object that will act as a prototype and then create the object based on that prototype
// var personProto = {
//     calculateAge: function() {
//         console.log (2016 - this.yearOfBirth);
//     }
// };

// // 1
// var john = Object.create(personProto);
// john.name = 'John';
// john.yearOfBirth = 1990;
// john.job = 'teacher';

// // 2
// var jane = Object.create(personProto, {
//     name : { value: 'Jane'},
//     yearOfBirth : {value : 1969},
//     job : {value : 'designer'}
// });

/****7 Primitives vs objects */
// Primitives
// var a = 23;
// var b = a;
// a = 46;
// console.log (a);
// console.log (b);

// // Objects
// var obj1 = {
//     name : 'John',
//     age : 26
// };

// var obj2 = obj1;
// obj1.age = 30;
// console.log(obj1.age);
// console.log(obj2.age);

// // Functions
// var age = 27;
// var obj = {
//     name : 'Jonas',
//     city : 'Lisbon'
// };

// function change (a, b) {
//     a = 30;
//     b.city = 'San Francisco'
// }

// change (age, obj);
// console.log (obj.city)

/***8 First Class Functions Passing Functions as Arguments */

// var years = [1990, 1965, 1937, 2005, 1998];

// function arrayCalc(arr, fn) {
//     var arrRes = [];
//     // deep copy of array and apply fn on arr
//     for (var i = 0; i < arr.length; i++) {
//         arrRes.push(fn(arr[i]));
//     }
//     return arrRes;
// }

// // ele is year born
// function calculateAge(ele) {
//     return 2016 - ele;
// }

// // ele is age
// function isFullAge (ele) {
//     return ele >= 18;
// }

// // ele is age, return -1 if not between 18 to 81
// function maxHeartRate(ele) {
//     if (ele >= 18 && ele <= 81) {
//         return Math.round (206.9 - ( 0.67 * ele));
//     } else {
//         return -1;
//     }
// }

// var ages = arrayCalc(years, calculateAge);
// console.log (ages);

// var fullAges = arrayCalc(ages, isFullAge);
// console.log (fullAges);

// var heartRates = arrayCalc(ages, maxHeartRate);
// console.log (heartRates);

/**9  First class functions - Functions returning funcctions ****/
// job - string
// returns a function requiring 1 arg
// function interviewQuestion(job) {
//     if (job === 'designer') {
//         return function(name) {
//             console.log(`${name}, can you please explain what UX design is?`);
//         }
//     } else if (job === 'teacher') {
//         return function (name) {
//             console.log(`What subject do you teach, ${name}`);
//         }
//     } else {
//         return function (name) {
//             console.log(`Hello, ${name}, what do you do?`);
//         }
//     }
// }

// // this pattern allows question to be reused
// var teacherQuestion = interviewQuestion('teacher');
// var designerQuestion = interviewQuestion('designer');
// teacherQuestion('John');
// designerQuestion('John');

// interviewQuestion('teacher')('Mark');

/**10  Immediately Invoked function expression ****/
/* purpose: data privacy... prevent score from being accessed outside
 * create new scope hidden from outside scope
 * can only call the IIFE once */

//function delcarion
function game() {
    var score = Math.random() * 10;
    console.log (score >= 5);
}
game();

// IIFE, wrapping inside parenthesis tricks compiler into thinking contents are a expression
(function() {
    var score = Math.random() * 10;
    console.log (score >= 5);
})();

(function(goodLuck) {
    var score = Math.random() * 10;
    console.log (score >= (5 - goodLuck));
})(5);