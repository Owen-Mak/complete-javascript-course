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

// var johnData = [89, 120, 103];
// var mikeData = [116, 94, 123];
// var maryData = [97, 134, 105];

// var calcAvg = function (data) {
//     var sum = 0;
//     var count = 0;
//     for (val in data){        
//         sum += data[val];
//         count++;
//     }    
//     return sum / count;
// }

// var teamData = [
//     {name : "John", avg : calcAvg(johnData), data : [89, 120, 103]},
//     {name : "Mike", avg : calcAvg(mikeData), data : [116, 94, 123]},
//     {name : "Mary", avg : calcAvg(maryData), data : [97, 134, 105]}
// ];

// var winner, tie = false;
// for (teams in teamData) {
//     //console.log (avgScores[teams]);
//     if (!winner || teamData[teams].avg > winner.avg) {
//         winner = teamData[teams];
//         tie = false;
//     }
//     else if (teamData[teams].avg == winner.avg) {
//         tie = true;
//     }
// }

// if (!tie)
//     console.log (`The winner is ${winner.name} and the average is ${winner.avg}`)
// else 
//     console.log (`There is a draw.`)

