// Your code goes here
// 1. task

console.log('1. task: ')
function isEquals(num1, num2) {
    console.log(num1 > num2);
    return num1 > num2;
}
isEquals(3,3);

// 2. task

console.log('2. task: ')
function numberToString(num) {
    console.log(num.toString())
    return num.toString();
}
numberToString(1258);

// 3. task

console.log('3. task: ')
function storeNames() {
    let arr = [];
    let args = Array.prototype.slice.call(arguments);

    for (let i = 0; i < args.length; i++) {
        arr.push(args[i]);
    }
    console.log(arr);
    return arr;
}
storeNames('Tommy Shelby','Ragnar Lodbrok','Tom Hardy');

// 4. task

console.log('4. task: ');
function getDivision(num1, num2) {
    if (num1 < num2) {
        console.log(num2 / num1);
        return num2 / num1;
    } else if (num1 > num2) {
        console.log(num1 / num2);
        return num1 / num2;
    }
}
getDivision(4,1);
getDivision(2,8);

// 5. task

console.log('5. task: ');
function negativeCount(arr) {
    let counter = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            counter++;
        }
    }
    console.log(counter);
    return counter;
}
negativeCount([4,3,2,9]);
negativeCount([0,-3,5,7]);

// 6. task

console.log('6. task');
function letterCount(str, lttr) {
    let counter = 0;
    let strArr = str.split('');

    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i] === lttr) {
            counter++;
        }
    }
    console.log(counter);
    return counter;
}
letterCount('Marry','r');
letterCount('Barny','y');
letterCount('','z');

// 7. task

console.log('7. task');
function countPoints(arr) {
    let splitted = [];
    let points = 0;
    for (let i = 0; i < arr.length; i++) {
        splitted.push(arr[i].split(':'));
    }

    for (let i = 0; i < splitted.length; i++) {
        for (let j = 0; j < splitted[i].length; j++) {
            splitted[i][j] = parseInt(splitted[i][j]);
        }
        if (splitted[i][0] > splitted[i][1]) {
            points += 3;
        } else if (splitted[i][0] === splitted[i][1]) {
            points += 1;
        } else {
            points += 0;
        }
    }
    console.log(points);
    return points;
}
countPoints(['100:90','110:98','100:100','95:46','54:90','99:44','90:90','111:100']);
