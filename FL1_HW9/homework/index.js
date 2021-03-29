// 1. task
function convert(arr) {
    var result = [];
    var args = Array.prototype.slice.call(arguments);
    
    for (let i = 0; i < args.length; i++) {
        if (typeof args[i] === 'number') {
            result.push(args[i].toString(10));
        } else if (typeof args[i] === 'string') {
            result.push(parseInt(args[i]));
        }
    }
    console.log('-------1. task: \n' + result);
    return result;
}

convert('1',2,3,'4');

// 2. task

function executeforEach(arr, callback) {
    console.log('-------2. task: \n')
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i]);
    }
}

executeforEach([1,2,3], function(el) {console.log(el * 2)});

// 3. task

function mapArray(arr, callback) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'string') {
            arr[i] = parseInt(arr[i]);
        }
        result.push(callback(arr[i]));
    }
    console.log('-------3. task: ' + result);
    return result;
}

mapArray([2, '5', 8], function(el) {return el + 3})

// 4. task

function filterArray(arr, callback) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i])) {
            result.push(arr[i]);
        }
    }
    console.log('-------4. task: ' + result);
    return result;
}

filterArray([2, 5, 8], function(el) { return el % 2 === 0 });

// 5. task

function getValuePosition(arr, pos) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === pos) {
            console.log('-------5. task: \n' + (i+1));
            return i+1;
        }
    }
    if (!arr.includes(pos)) {
        console.log(false);
        return false;
    }
}
getValuePosition([2, 5, 8], 8);
getValuePosition([12, 4, 6], 1);

// 6. task

function flipOver(str) {
    let arr = str.split('');
    let flipedArr = [];
    for (let i = arr.length; i >= 0; i--) {
        flipedArr.push(arr[i]);
    }
    console.log('-------6. task: \n' + flipedArr.join(''));
    return flipedArr.join('');
}
flipOver('hey world');

// 7. task

function makeListFromRange(arr) {
    let result = [];
    for (let i = arr[0]; i <= arr[1]; i++){
        result.push(i);
    }
    console.log('-------7. task: \n' + result);
    return result;
}
makeListFromRange([2, 7]);

// 8. task

const fruits = [
    { name: 'apple', weight: 0.5 },
    { name: 'pineapple', weight: 2 }
];

function getArrayOfKeys(arr, key) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i][key]);
    }
    console.log('-------8. task: \n' + result);
    return result;
}
getArrayOfKeys(fruits, 'name'); 

// 9. task

const basket = [
    { name: 'Bread', weight: 0.3 },
    { name: 'Coca-Cola', weight: 0.5 },
    { name: 'Watermelon', weight: 8 }
];

function getTotalWeight(arr) {
    let totalWeight = 0;
    for (let i = 0; i < arr.length; i++) {
        totalWeight += (arr[i]['weight']);
    }
    console.log('-------9. task: \n' + totalWeight);
    return totalWeight;
}

getTotalWeight(basket);

// 10. task

const date = new Date(2020, 0, 2);
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
console.log('-------10. task: \n')
function getPastDay(d, day) {
    let cd = new Date(d.getTime());
    let subFromDd = cd.getDate()-day;
    cd.setDate(subFromDd);
    console.log(cd.getDate());
}
getPastDay(date, 1);
getPastDay(date, 2);
getPastDay(date, 365);

// 11. task

console.log('-------11. task: \n')
function formatDate(d) {
    var cd = new Date(d.getTime());
    var datestring = cd.getFullYear() + "/" + checkLowerThenTen(cd.getMonth()+1)  + "/" + checkLowerThenTen(cd.getDate()) + " " +
    checkLowerThenTen(cd.getHours()) + ":" + checkLowerThenTen(cd.getMinutes());
    console.log(datestring);
    return datestring;
}

function checkLowerThenTen(v) {
    if (v < 10) {
        return ('0' + v).slice(-2);
    } else {
        return v;
    }
}

formatDate(new Date('6/15/2019 09:15:00'));
formatDate(new Date());
