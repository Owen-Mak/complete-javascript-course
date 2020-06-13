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
// function game() {
//     var score = Math.random() * 10;
//     console.log (score >= 5);
// }
// game();

// // IIFE, wrapping inside parenthesis tricks compiler into thinking contents are a expression
// (function() {
//     var score = Math.random() * 10;
//     console.log (score >= 5);
// })();

// (function(goodLuck) {
//     var score = Math.random() * 10;
//     console.log (score >= (5 - goodLuck));
// })(5);


/*** 11. Closures */
// function retirement(retirementAge) { // a more generic function
//     var str = ' years left until retirement.'
//     return function(yearOfBirth) {
//         var age = 2016 - yearOfBirth;
//         // inner function can keep using 'str' after retirement() is gone/done executing
//         // hence, this is closure
//         console.log((retirementAge - age) + str);        
//     }
// }

// var retirementUS = retirement(66);
// //retirementUS(1990);  
// retirement(66)(1990); // same thing as above 2 lines

// var retirementGermany = retirement(65);
// retirementGermany(1990);
// var retirementIceland = retirement(67);
// retirementIceland(1990);

// function interviewQuestion(job) {       
//     return function(name) {
//         if (job === 'designer')
//             console.log(`${name}, can you please explain what UX design is?`);
//         else if (job === 'teacher')
//             console.log(`What subject do you teach, ${name}`);
//         else
//             console.log(`Hello, ${name}, what do you do?`);
//     }    
// }
// interviewQuestion('designer')('Owen');
// interviewQuestion('teacher')('John');
// interviewQuestion('other')('Jane');


/**** 12. Bind, Call, and Apply ***/
/* CALL() */
// var john = {
//     name : 'John',
//     age : 26,
//     job : 'teacher',    
//     presentation : function (style, timeOfDay) { // timeOfDay - morning, afternoon, evening
//         if (style === 'formal'){
//             console.log (`Good ${timeOfDay}, Ladies and gentlemen! I'm ${this.name}. I'm a ${this.job} and I'm ${this.age} years old.`);
//         } else if (style === 'friendly') {
//             console.log (`Hey! What's up? I'm ${this.name}. I'm a ${this.job} and I'm ${this.age} years old. Have a nice ${timeOfDay}.`);
//         }
//     }
// };

// var emily = {
//     name : 'Emily',
//     age : 35,
//     job : 'designer'
// };

// john.presentation('formal', 'morning');

// // method borrowing - using john's method on emily
// john.presentation.call(emily, 'friendly', 'afternoon'); // change this variable in presentation method to emily

// /* APPLY() - same as call, but accepts argument as an array */ 
// //john.presentation.call(emily, ['friendly', 'afternoon']);

// /** BIND() - similar to call, but does not immediately call the function, generates a copy to be called later instead; allows us to preset arguments */
// // carrying - technique to create a function based on some other function with preset values
// var johnFriendly = john.presentation.bind(john, 'friendly'); //sets style as friendly so we don't have to keep passing it in and saves it to johnFriendly
// johnFriendly('morning');
// johnFriendly('night');

// var emilyFormal = john.presentation.bind(emily, 'formal');
// emilyFormal('afternoon');

// /*BIND EXAMPLE*/
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
// function isFullAge (limit, ele) {
//     return ele >= limit;
// }

// var ages = arrayCalc(years, calculateAge);
// var isFullAgeJapan = isFullAge.bind(this, 20);
// console.log(ages);
// console.log("isFullAgeJapan", arrayCalc(ages, isFullAgeJapan));


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

// 7 - encapsulate the code
(function() {
    var questionArr;
    /* 1. function constructor
    *  question - string
    *  inputAns - array of string
    *  correctAns- int
    */
    function Question(question, inputAns, correctAns) {
        this.question = question;
        this.inputAns = inputAns;
        this.correctAns = correctAns;
        this.logQuestion = function (scoreTracker) {
            console.log(`${this.question}`);
            for (ansNum in this.inputAns) {
                console.log (`${ansNum}: ${this.inputAns[ansNum]}`);
            }
            // 5. prompt for answer
            var userAns = prompt("Enter your answer here:");
            if (userAns != 'exit') {
                var parsedUserAns = parseInt(userAns);            
                this.logResult(parsedUserAns, scoreTracker);
                return true;        
            } else {
                console.log ('bye');
                return false;
            }
        };
        this.logResult = function(parsedUserAns, scoreTracker) {
            // 6. check answer
            if (!isNaN(parsedUserAns) && (parsedUserAns == this.correctAns)) {                
                console.log ("Correct!");
                scoreTracker(true);
            } else {                
                console.log ("Incorrect");
                scoreTracker(false);
            }            
        };
                
    };

    var generateQuestions = function () {
        // 2 - create a couple of questions
        var mathQ1 = new Question ("What is 1 + 1", ["3", "2", "5", "7"], 1);
        var triviaQ1 = new Question ("What is the name of this course's teacher?", ["John", "Michael", "Jonas", "Mark"], 2);
        var triviaQ2 = new Question ("Is Javascript the coolest language in the world?", ["Yes", "No"], 0);
        var trivaiQ3 = new Question ("Which of the following best describe coding?", ['Boring','Hard','Fun','Tedious'], 2)
        // 3 - store them in an array
        questionArr = new Array(mathQ1, triviaQ1, triviaQ2, trivaiQ3);
    }(); // IIFE

    // 10. Use closure to track the score
    var trackScore = function() {
        var score = 0;
        return function(correct) {
            if (correct)
                score++;
            console.log (`Current score: ${score}`);
            console.log ("*********************************************************************");
        }
    };
    
    var gameLoop = function() {
        var restart = true;
        var scoreTracker = trackScore();
        while (restart) {
            var randQNum = Math.floor (Math.random() * questionArr.length);            
            restart = questionArr[randQNum].logQuestion(scoreTracker);
        }
    }();
})(); //IIFE


/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/