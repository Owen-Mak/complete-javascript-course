// console.log ("Hello World!!!");

// var firstName = 'John';
// console.log (firstName);

// var lastName = "Smith";
// var age = 28;

// var fullAge = true;
// console.log (fullAge);

// var job;
// console.log(job); // undefined

// var _years = 3;
// var $years = 10;

// //Variable Mutation and Type Coercion  
// console.log(firstName + ' ' + age);

// var job, isMarried;
// job = 'teacher';
// isMarried = false;

// console.log(firstName + ' is a ' + age + ' year old ' + job + '. Is he married? ' + isMarried);

// //variable mutation
// age = 'twenty eight';

// //var lastName = prompt('What is his last name?');
// console.log(lastName);

// /* Operators */
// var add = 1 + 2;
// var subtract = 1 - 2;
// // logical Operators
// var greater = add > subtract;
// //type of operator
// console.log(typeof(add)); //number

// //Precedence
// console.log ("Precedence");
// var now = 2018;
// var yearJohn = 1989;
// var fullAge = 18;

// var isFullAge = now - yearJohn >= fullAge;
// console.log(isFullAge);

// var ageJohn = now - yearJohn;
// var ageMark = 35;
// var average = (ageJohn + ageMark) / 2;
// console.log (average);

// var x, y;
// x = y = (3 + 5) * 4 - 6;// assignment operator associtivity is from right to left

/*****************************
* CODING CHALLENGE 1
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs
3. Create a boolean variable containing information about whether Mark has a higher BMI than John.
4. Print a string to the console containing the variable from step 3. (Something like "Is Mark's BMI higher than John's? true"). 

GOOD LUCK 😀
*/
// var markMass = prompt("Enter Mark's mass (kg): ");
// var markHeight = prompt("Enter Mark's height (m): ");
// var johnMass = prompt("Enter John's mass (kg): ");
// var johnHeight = prompt("Enter John's height (m)");

// var markBMI = markMass / markHeight ^ 2;
// var johnBMI = johnMass / (johnHeight ^ 2);

// var markGT = markBMI > johnBMI;

// console.log ("Is Mark's BMI higher than John's?", markGT)

// switch
/*
var age = 25;
var firstName = 'John';

switch(true){
    case age < 13:
        console.log(`${firstName} is a boy.`);
        break;
    case age >= 13 && age < 20:
        console.log(`${firstName} is a teenager.`);
        break;
    case age >= 20 && age < 30:
        console.log(`${firstName} is a young man.`);
        break;
    default:
        console.log(`${firstName} is a man.`);
        break;

}
*/

/*****************************
* CODING CHALLENGE 2
*/

/*
John and Mike both play basketball in different teams. In the latest 3 games, John's team scored 89, 120 and 103 points, while Mike's team scored 116, 94 and 123 points.

1. Calculate the average score for each team
2. Decide which teams wins in average (highest average score), and print the winner to the console. Also include the average score in the output.
3. Then change the scores to show different winners. Don't forget to take into account there might be a draw (the same average score)

4. EXTRA: Mary also plays basketball, and her team scored 97, 134 and 105 points. Like before, log the average winner to the console. HINT: you will need the && operator to take the decision. If you can't solve this one, just watch the solution, it's no problem :)
5. Like before, change the scores to generate different winners, keeping in mind there might be draws.

GOOD LUCK 😀
*/

// var calcAvg = function (data) {
//     var sum = 0;
//     var count = 0;
//     for (val in data){        
//         sum += data[val];
//         count++;
//     }    
//     return sum / count;
// };

// function team(name, scores) {
//     this.name = name;
//     this.scores = scores;
//     this.avg = calcAvg(this.scores)
// }

// var teamArr = new Array();
// teamArr.push (new team("john", [89, 120, 103]));
// teamArr.push (new team("mike", [116, 94, 123]));
// teamArr.push (new team("mary", [97, 134, 105]));

// console.log("teamArr", teamArr);

// var winner, tie = false;
// for (teams in teamArr) {
//     //console.log (avgScores[teams]);
//     if (!winner || teamArr[teams].avg > winner.avg) {
//         winner = teamArr[teams];
//         tie = false;
//     }
//     else if (teamArr[teams].avg == winner.avg) {
//         tie = true;
//     }
// }

// if (!tie)
//     console.log (`The winner is ${winner.name} and the average is ${winner.avg}`)
// else 
//     console.log (`There is a draw.`)

// Functions
// function calculateAge(birthYear) {
//     return 2018 - birthYear;
// }

// console.log ("calculated age:", calculateAge(1990));

// function yearsUntilRetirement(birthYear, firstName){
//     var age = calculateAge(birthYear);
//     var retirement = 65 - age;
//     console.log(firstName + ' retires in ' + retirement + ' years.');
// }; // this needs to be called with yearsUntilRetirement(1990, 'John');

// var yearsUntilRetirementIIVE = function (birthYear, firstName) {
//     var age = calculateAge(birthYear);
//     var retirement = 65 - age;
//     console.log(firstName + ' retires in ' + retirement + ' years.');
// }(1990, 'John');  // this is immediately called

// Function declaration
// function whatDoYouDo(job, firstName){

// }

// Function expression
// var whatDoYouDo = function (job, firstName){
//     switch(job) {
//         case 'teacher':
//             return firstName + ' teaches kids how to code';
//         case 'driver':
//             return firstName + ' drives a cab in Lisbon';
//         case 'designer':
//             return firstName + ' designs beautiful websites';
//         default:
//             return firstName + ' does something else';
//     }
// };
// console.log (whatDoYouDo('teacher', 'john'));

// Arrays
// var names = ['John', 'Mark', 'Jane'];
// var years = new Array(1990, 1969, 1948);
// years.push(1234); // add new element to end of array
// years.pop ();  //remove last element
// years.shift(); //remove first eleement
// years.indexOf(1990); //return -1 if element not found, else return position

/*****************************
* CODING CHALLENGE 3
*/

/*
John and his family went on a holiday and went to 3 different restaurants. The bills were $124, $48 and $268.

To tip the waiter a fair amount, John created a simple tip calculator (as a function). He likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

In the end, John would like to have 2 arrays:
1) Containing all three tips (one for each bill)
2) Containing all three final paid amounts (bill + tip).

(NOTE: To calculate 20% of a value, simply multiply it with 20/100 = 0.2)

GOOD LUCK 😀
*/
///bill is in dollars, returns tip
// function calculateTip(bill){
//     if (bill < 50)
//         return bill * .20;
//     else if (bill >= 50 && bill <= 200)
//         return bill * .15
//     else
//         return bill * .10
// }

// var billArr = [124, 48, 268];
// var tipArr = billArr.map( x => {return calculateTip(x);});
// var final = billArr.map ( x => {return x + calculateTip(x);});

// console.log (billArr, tipArr, final);


// Jo's Version
// function calcTips (bills) {   
//     return bills.map( t => { 
//         if (t < 50)
//             return t * 0.2;
//         else if (t >= 50 && t <= 200)
//             return t * 0.15;
//         else
//             return t * 0.1;
//     });
// }

// function Bill(name, bills) {
//     this.name = name;
//     this.bills = bills;
//     this.tips = calcTips(bills);
//     this.totals = function () {
//        return this.bills.map( (x, i=0) => {
//         return x + this.tips[i]});
//     }
// }

// var JosBill = new Bill('Jo', [50,100,201]);
// console.log(JosBill);
// console.log(JosBill.totals());

/**************** objects and properties */

// var john = {  // object literal
//     firstName : 'John',
//     lastName : 'Smith',
//     birthYear : 1990,
//     family : ['jane', 'mark', 'bob', 'emily'],
//     job : 'teacher'
// };  

// console.log(john.firstName);  //dot notation
// console.log(john["firstName"]); // bracket notation

// // new Object syntax
// var jane = new Object();
// jane.name = 'Jane';
// jane.birthYear = 1969;
// jane['lastName'] = 'Smith';
// console.log (jane);


/// Objects and methodss
// var john = {  // object literal
//         firstName : 'John',
//         lastName : 'Smith',
//         birthYear : 1990,
//         family : ['jane', 'mark', 'bob', 'emily'],
//         job : 'teacher',
//         calcAge : function () {
//             //return 2018 - this.birthYear;
//             this.age = 2018 - this.birthYear;
//         }
// }; 
// console.log (john.calcAge(1990));

/*****************************
* CODING CHALLENGE 4
*/

/*
Let's remember the first coding challenge where Mark and John compared their BMIs. Let's now implement the same functionality with objects and methods.
1. For each of them, create an object with properties for their full name, mass, and height
2. Then, add a method to each object to calculate the BMI. Save the BMI to the object and also return it from the method.
3. In the end, log to the console who has the highest BMI, together with the full name and the respective BMI. Don't forget they might have the same BMI.

Remember: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).
*/
// function person (name, mass, height){
//     this.name = name;
//     this.mass = mass;
//     this.height = height;
//     this.BMI = this.mass / (this.height^2);
// }
// var Mark = new person ("Mark", 70, 1.85);
// var John = new person ("John", 90, 1.95);
// if (Mark.BMI > John.BMI)
//     console.log("Mark has higher BMI.");
// else if (John.BMI > Mark.BMI)
//     console.log ("John has higher BMI.");
// else
//     console.log("They have equal BMI.");


/// Loops and iteration

// for count loop
// for (var i = 0; i < 10; i++) {
//     console.log(i);
// }

// // while loop
// var i = 0;
// while (i < 10) {
//     console.log(i);
//     i++;
// } // supports continue and break

/*****************************
* CODING CHALLENGE 5
*/

/*
Remember the tip calculator challenge? Let's create a more advanced version using everything we learned!

This time, John and his family went to 5 different restaurants. The bills were $124, $48, $268, $180 and $42.
John likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

Implement a tip calculator using objects and loops:
1. Create an object with an array for the bill values
2. Add a method to calculate the tip
3. This method should include a loop to iterate over all the paid bills and do the tip calculations
4. As an output, create 1) a new array containing all tips, and 2) an array containing final paid amounts (bill + tip). HINT: Start with two empty arrays [] as properties and then fill them up in the loop.

/** Part ONE */
/// name - string name of client, bill - array of ints
// function billCalculator(name, bill) {
//     this.name = name;
//     this.bill = bill;
//     this.calcTip = function () { 
//         return this.bill.map ( x => {
//             if (x < 50)
//                 return x * 0.2;
//             else if (this.bill >= 50 && this.bill <= 200)
//                 return x * 0.15;
//             else
//                 return x * 0.1;
//         });
//     };
//     this.tip = this.calcTip();
//     this.calcTotal = function() {
//         return this.bill.map ( (x, i = 0) => {
//             return x + this.tip[i++];
//         });
//     };
//     this.total = this.calcTotal();
// }

// var johnCalc = new billCalculator("John", [124,44,268,180,42]);
// console.log(johnCalc);

/*
EXTRA AFTER FINISHING: Mark's family also went on a holiday, going to 4 different restaurants. The bills were $77, $375, $110, and $45.
Mark likes to tip 20% of the bill when the bill is less than $100, 10% when the bill is between $100 and $300, and 25% if the bill is more than $300 (different than John).

5. Implement the same functionality as before, this time using Mark's tipping rules
6. Create a function (not a method) to calculate the average of a given array of tips. HINT: Loop over the array, and in each iteration store the current sum in a variable (starting from 0). After you have the sum of the array, divide it by the number of elements in it (that's how you calculate the average)
7. Calculate the average tip for each family
8. Log to the console which family paid the highest tips on average
*/
/*** PART TWO */
function johnTipMethod(bill) { 
    return bill.map ( x => {
        if (x < 50)
            return x * 0.2;
        else if (x >= 50 && x < 200)
            return x * 0.15;
        else
            return x * 0.1;
    })
};

function markTipMethod(bill) { 
    return bill.map ( x => {
        if (x < 100)
            return x * 0.2;
        else if (x >= 100 && x < 300)
            return x * 0.1;
        else
            return x * 0.25;
    })
};

function billCalculator(name, bill, calcTipCallback) {
    this.name = name;
    this.bill = bill;
    this.calcTip = calcTipCallback;
    this.tip = this.calcTip(this.bill);
    this.calcTotal = function() {
        return this.bill.map ( (x, i = 0) => {
            return x + this.tip[i++];
        });
    };
    this.total = this.calcTotal();
    this.calcAvgTip = function () {
        return (this.tip.reduce( (accumulator, curr) => accumulator + curr)) / this.tip.length;
    }
    this.avgTip = this.calcAvgTip();
}

var johnCalc = new billCalculator("John", [124,44,268,180,42], johnTipMethod);
var markCalc = new billCalculator("Mark", [77, 375, 110, 45],  markTipMethod);
console.log("John results", johnCalc );
console.log("Mark results", markCalc );

if (johnCalc.avgTip > markCalc.avgTip) {
    console.log ("John's family paid higher average tip.");
} else if (markCalc.avgTip > johnCalc.avgTip)
    console.log ("Mark's family paid higher average tip.");
else
    console.log ("They have equal average tips");