///////////////////////////////////////
// Lecture: Hoisting

// calculateAge(1965);
// function calculateAge (year){
//     console.log(2016 - year);
// }

// // hoisting does not work with function expression!!!
// // retirement(1990);   ///this will not work!!
// var retirement = function (year) {
//     console.log(65 - (2016 - year));
// };

// //variables
// console.log(age); // undefined if age is declared only; error if age is not declared
// var age = 23;

// function foo(){
//     console.log(age);
//     var age = 65;
//     console.log(age); //65
// }
// foo(); // foo gets its own execution context
// console.log(age); //23

///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword

// console.log(this); // window object

// calculateAge(1985); // regular function call, this points to window object; function is attached to global object
// function calculateAge(year){
//     console.log(2016 - year);
//     console.log(this);
// }

var john = {
    name : 'John',
    yearOfBirth : 1990,
    calculateAge: function () { // function expression (method)
        console.log(this); // this points to john object
        console.log(2016 - this.yearOfBirth);

        function innerFunction() { // this is still a regular function
            console.log(this); // this points to window object
        }
        innerFunction();
    }
}
john.calculateAge();

var mike = {
    name : 'Mike',
    yearOfBirth : 1984
};

mike.calculateAge = john.calculateAge;  // method borrowing
mike.calculateAge();







