// business logic
var budgetController = (function () { 
    
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems : {
            exp : [],
            inc : []
        },
        totals : {
            exp : 0,
            inc : 0
        },
        budget : 0,
        percentage : -1
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function(curr) {
            sum += curr.value;
        });
        data.totals[type] = sum;
        return sum;
    };

    return {
        addItem : function (type, description, value) {
            var newItem, id;
            
            // gets the id of last element and add one to use as new element ID
            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }
            
            if (type === "exp") {
                newItem = new Income(id, description, value);                
            } else if (type === 'inc') {
                newItem = new Expense(id, description, value);                
            } else {
                // should never get here
            }
            // Return the new element
            data.allItems[type].push(newItem);
            
            return newItem;
        },
        
        // calculate sum of all incomes, expenses, and percentage
        calculateBudget : function () {
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the percentage of income that we spend
            // Expense = 100 and income of 200, percent is 50%
            if (data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
            
        },

        getBudget : function () {
            return {
                budget: data.budget,
                totalInc : data.totals.inc,
                totalExp : data.totals.exp,
                percent : data.percentage
            };        
        },

        testing : function (){ //TODO: REMOVE
            console.log(data);
        }
    }

})(); // budgetController IIFE

var UIController = (function () {
    
    var DOMstrings = {
        inputType : ".add__type",
        inputDescription : ".add__description",
        inputAmountValue :".add__value",
        inputBtn : '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel : '.budget__value',
        incomeLabel : '.budget__income--value',
        expenseLabel : '.budget__expenses--value',
        percentageLabel : '.budget__expenses--percentage'
    }

    return {
        getInput : function () {
            var type = document.querySelector(DOMstrings.inputType).value; // will be either inc or exp
            var description = document.querySelector(DOMstrings.inputDescription).value;
            var amountValue = parseFloat (document.querySelector(DOMstrings.inputAmountValue).value);
            return {
                type : type,
                description : description,
                value : amountValue
            }
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
            if (type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%">\
                    <div class="item__description">%description%</div>\
                    <div class="right clearfix">\
                        <div class="item__value">+ %value%</div>\
                        <div class="item__delete">\
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\
                        </div>\
                    </div>\
                </div>';
            } else if (type === 'exp'){
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%">\
                    <div class="item__description">%description%</div>\
                    <div class="right clearfix">\
                        <div class="item__value">%value%</div>\
                        <div class="item__percentage">21%</div>\
                        <div class="item__delete">\
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\
                        </div>\
                    </div>\
                </div>';
            }

            // replace placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
        },

        clearFields: function() {
            var fields = document.querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputAmountValue}`); // querySelectorAll returns a list
            //console.log('fields', fields);
            var fieldsArr = Array.prototype.slice.call(fields); // trick slice method into thinking we gave it an array
            //console.log('fieldsArr', fieldsArr);
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            // reset focus to description
            fieldsArr[0].focus();
        },

        displayBudget : function(obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;
            if (obj.percent > 0){  // only display percent if it is greater than 0
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percent + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        getDOMStrings : function () {
            return DOMstrings;
        }
    }

})(); // UIController IIFE


// connects budgeController and UIController - let's them talk to each other
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13){ // Enter key, which is for older browser
                ctrlAddItem();
            }
        })  // happens on the global document
    };
    
    var updateBudget = function () {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        console.log(budget);

        // 3. Display the budget on the user interface
        UICtrl.displayBudget(budget);
    };

    
    var ctrlAddItem = function () {
        var input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();
        //console.log (input);        
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0)  {        
            // 2. add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            
            // 3. Add the new item to the user interface
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update the budget
            updateBudget();
        }
    };

    return {
        init : function () {
            setupEventListeners();
            UICtrl.displayBudget({                
                budget: 0,
                totalInc : 0,
                totalExp : 0,
                percent : 0
            });
        }
    }

})(budgetController, UIController); //Controller IIFE

controller.init();