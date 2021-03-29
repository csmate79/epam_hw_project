// Your code goes here
function myFunction () {
    let batteries = prompt('Please your batteries amount');
    let bat1 = parseInt(batteries);
    let defBatteries = prompt('Percentage of defective batteries');
    let bat2 = parseInt(defBatteries);

    if (isNaN(bat1) || isNaN(bat2) || bat2 < 0 || bat1 < 0 || bat2 > 100) {
        alert('Invalid input data');
    } else {
        let result = bat2*100 / bat1;
        let rounded;

        if (result % 2 !== 0) {
            rounded = result.toFixed(2);
            alert(rounded);
        } else {
            alert(result);   
        }
    }
}