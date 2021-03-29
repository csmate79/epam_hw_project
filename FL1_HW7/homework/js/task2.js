// Your code goes here
function getMiddle() {
    let s = prompt('Please enter a word!')
    let middle = Math.floor(s.length/2);
    
    if (/^\s*$/.test(s)) {
        return alert('Invalid value'); 
    } else if (s.length % 2 === 0) {
        if (s[middle-1] === s[middle]) {
            return alert('Middle characters are the same');
        } else {
            return alert(s[middle-1] + s[middle]);
        }
    } else {
        return alert(s[middle]);
    }
}