// business logic
var budgetController = (function () { 
    
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value; 
        this.percentage = -1;       
    };
    
    Expense.prototype.calculatePercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round(this.value / totalIncome * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    }

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
                newItem = new Expense(id, description, value);                
            } else if (type === 'inc') {
                newItem = new Income(id, description, value);                
            } else {
                // should never get here
            }
            // Return the new element
            data.allItems[type].push(newItem);
            
            return newItem;
        },

        // type - expense or income
        // id - item's (income or expense) id
        deleteItem : function (type, id){
            var ids, index;            
            // create an array with all id numbers for particular type
            // map always returns a new array
            ids = data.allItems[type].map(function(curr) {
                return curr.id
            });

            index = ids.indexOf(id);  // finds the index given an id
            //console.log('index', index, 'ids', ids, 'id', id, 'id type', typeof(id));
            if (index !== -1) { //element was found                
                data.allItems[type].splice(index, 1);  // remove the element at index
            }
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

        calculatePercentages : function (){
            data.allItems.exp.forEach(function(curr) {
                curr.calculatePercentage(data.totals.inc);
            });
        },

        getPercentages : function () {
            var allPerc = data.allItems.exp.map (function(curr) {
                return curr.getPercentage();
            });
            return allPerc;
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
        percentageLabel : '.budget__expenses--percentage',
        container : '.container',
        expenses : '.item__percentage',
        dateLabel : '.budget__title--month'
    }

    var formatNumber = function (num, type) {
        var numSplit, int, dec, intComma = "",sign;

        // exactly 2 decimals
        num = Math.abs(num);
        // automatically converts num to an object so it can use toFixed, returns string type
        num = num.toFixed(2);  // toFixed belongs number prototype... 
                    
        // comma seperating thousands
        numSplit = num.split('.');  // get the whole number part
        
        int = numSplit[0];
        dec = numSplit[1];

        if (int.length > 3){
            while (int.length > 3) {
                if (intComma.length > 0) {
                    intComma = int.substring(int.length - 3) + ',' + intComma;
                    int = int.substring(0, int.length - 3);
                } else {
                    intComma = int.substring(int.length - 3);
                    int = int.substring(0, int.length - 3);
                }
            }
            intComma = int + ',' + intComma;
        } else {
            intComma = int;
        }

        // + or - before number
        sign = (type === 'exp') ? '-' : '+';
        return sign + ' ' + intComma + '.' + dec;
        
    };

        // list - node list
        // callback
        var nodeListForEach = function (list, callback) {
            for (var i = 0; i < list.length; i++) {
                callback(list[i], i);
            }
        };

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
                html = '<div class="item clearfix" id="inc-%id%">\
                    <div class="item__description">%description%</div>\
                    <div class="right clearfix">\
                        <div class="item__value">%value%</div>\
                        <div class="item__delete">\
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\
                        </div>\
                    </div>\
                </div>';
            } else if (type === 'exp'){
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%">\
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
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            // Insert the HTML into the DOM            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
        },

        deleteListItem : function (selectorID) {            
            var elem = document.querySelector(`#${selectorID}`);
            elem.parentNode.removeChild(elem);  // access parent to remove itself
            
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
            var type = obj.budget > 0 ? 'inc' : 'exp'
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');
            if (obj.percent > 0){  // only display percent if it is greater than 0
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percent + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages : function (percentages) {
            var fields = document.querySelectorAll(DOMstrings.expenses);  // fields is a NodeList
            
            nodeListForEach(fields, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '***';
                }
            });
        },

        displayMonth : function () {
            var now, year, month, monthMap;
            now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
            monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            document.querySelector(DOMstrings.dateLabel).textContent = `${monthMap[month]} ${year}`;
        },

        changeType : function () {
            // select three element to receive red class
            var fields = document.querySelectorAll(`${DOMstrings.inputType},${DOMstrings.inputDescription},${DOMstrings.inputAmountValue}`);
            nodeListForEach(fields, function(curr, index) {
                curr.classList.toggle('red-focus');                
            });
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
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
        });  // happens on the global document

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
    };
    
    var updateBudget = function () {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        var budget = budgetCtrl.getBudget();        

        // 3. Display the budget on the user interface
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function () {
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();

        // 2. Read from budget controller
        var percentages = budgetCtrl.getPercentages();

        // 3. Update UI
        UICtrl.displayPercentages(percentages);
    }

    
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

            // 6. Calculate and update the percentages
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function (event) {
        var itemID, splitID, type, id;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; //relying on DOM structure ** NOT GOOD **
        if (itemID) {
            //console.log(itemID);
            splitID = itemID.split('-'); //get the item id            
            type = splitID[0];
            id = splitID[1] ? parseInt(splitID[1]) : -1;            
            // 1. delete the item from the data structure
            budgetCtrl.deleteItem(type, id);
            
            // 2. delete the item from UI
            UICtrl.deleteListItem(itemID);

            // 3. Update the budget on the UI
            updateBudget();

            // 4. Update percentages
            updatePercentages();
        }
    };

    return {
        init : function () {
            setupEventListeners();
            UICtrl.displayMonth();
            UICtrl.displayBudget({                
                budget: 0,
                totalInc : 0,
                totalExp : 0,
                percent : 0
            });        }

    }

})(budgetController, UIController); //Controller IIFE

controller.init();