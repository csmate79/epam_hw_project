/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
console.log('1. task');
function getDate(yyyy,mm,dd) {
    const date = new Date(yyyy,mm,dd);
    let diff = Date.now() - date.getTime();
    let age = new Date(diff);
    console.log('Your are ' + (age.getUTCFullYear() - 1970) + ' years old.');
    return age.getUTCFullYear() - 1970;
}
getDate(2001,6,22);

console.log('2. task');
function getWeekDay(date) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date(date.getTime());
    console.log(days[d.getDay()]);
    return d.getDay();
}
getWeekDay(new Date('1998,5,21'));

console.log('3. task');
function getProgrammersDay(year) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date(year.toString());
    d.setDate(d.getDate() + 255);
    let result = d.getDate() + ' ' + monthNames[d.getMonth()] + ', ' + d.getUTCFullYear() + ' (' + days[d.getDay()] + ')';
    console.log(result);
    return result;
}
getProgrammersDay(2019);

console.log('4. task');
function howFarIs(str) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const days2 = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let newStr = str.charAt(0).toUpperCase() + str.slice(1);
    let date = new Date();
    let d = date.getDay();

    let once = true;
    let number = 0;
    let indexN = days2.indexOf(newStr);
    let indexD = days2.indexOf(days[d]);
    for (let i = 0; i < days.length; i++) {
        if (newStr === days[d] && once) {
            once = false;
            console.log('Hey, today is ' + days[d] + ' =)');
            return 'Hey, today is ' + days[d] + ' =)';
        } else if (once) {
            once = false;
            while (indexN !== indexD) {
                number++;
                indexN++;
                if (indexN === days.length) {
                    indexN = 0;
                }
            }
            console.log('It\'s ' + number + ' day(s) left till ' + days[d]);
            return 'It\'s ' + number + ' day(s) left till ' + days[d];
        }
    }
    
}
howFarIs('monday');

console.log('5. task');
function isValidIdentifier(str) {
    let regex = /^\D[A-Za-z\d$_]{1,}$/;
    let result = regex.test(str);
    console.log(result);
    return result;
}
isValidIdentifier('myVar!');
isValidIdentifier('myVar$');
isValidIdentifier('myVar_1');
isValidIdentifier('1_myVar');

console.log('6. task');
function capitalize() {
    const testStr = 'My name is John Smith. I am 27.';
    const finalSentence = testStr.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    console.log(finalSentence);
    return finalSentence;
}
capitalize();

console.log('7. task');
function isValidAudioFile(str) {
    let regex = /^\D(\w)+[^_][.](mp3|flac|alac|aac)$/;
    let result = regex.test(str);
    console.log(!!result);
    return !!result;
}
isValidAudioFile('file.mp4');
isValidAudioFile('my_file.mp3');
isValidAudioFile('file.mp3');

console.log('8. task');
function getHexadecimalColors() {
    const testString = 'color: #3f3; background-color: #AA00ef; and: #abcd';
    let regex = /([#]\b\w{3}\b|[#]\b\w{6}\b)/g;
    let arr = testString.match(regex);
    console.log(arr);
    return arr;
}
getHexadecimalColors();

console.log('9. task');
function isValidPassword(str) {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    let result = regex.test(str);
    console.log(!!result);
    return !!result;
}
isValidPassword('agent007');
isValidPassword('AGENT007');
isValidPassword('AgentOOO');
isValidPassword('Age_007');
isValidPassword('Agent007');
