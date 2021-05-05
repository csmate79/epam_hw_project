/* START TASK 1: Your code goes here */

let taskElements = [[0, 1, 2],[0, 1, 2],[0, 1, 2]];

const taskOneNode = document.getElementById('task1');

function view() {
    const table = document.createElement('table');
    taskOneNode.appendChild(table);
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    for (let i = 0; i < taskElements.length; i++) {
        if (taskElements[i]) {
            tbody.appendChild(createRow());
        }
        for (let j = 0; j < taskElements[i].length; j++) {
            tbody.children[i].appendChild(createEl());
        }
    }
    selectRandom(tbody);
    logic(tbody);
}
view();

function createRow() {
    return document.createElement('tr');
}

function createEl() {
    const el = document.createElement('td');
    el.innerHTML = 'Col';
    return el;
}

function selectRandom(from) {
    const randomCol = Math.floor(Math.random() * 2) + 1;
    const randomRow = Math.floor(Math.random() * 3);
    
    for (let i = 0; i < taskElements.length; i++) {
        for (let j = 0; j < taskElements[i].length; j++) {
            from.children[randomRow].children[randomCol].innerHTML = 'Special Col';
        }
    }
}

function logic(from) {
    for (let i = 0; i < taskElements.length; i++) {
        for (let j = 0; j < taskElements[i].length; j++) {
            if (taskElements[i][j] === 0) {
                from.children[i].children[j].addEventListener('click', () => {
                    if (from.children[i].children[j].style.backgroundColor === ''
                    || from.children[i].children[j].style.backgroundColor === 'green') {
                        from.children[i].children[j].style.backgroundColor = 'blue';
                        if (from.children[i].children[j+1].style.backgroundColor === '' 
                        || from.children[i].children[j+1].style.backgroundColor === 'green') {
                            from.children[i].children[j+1].style.backgroundColor = 'blue';
                        }
                        if (from.children[i].children[j+2].style.backgroundColor === ''
                        || from.children[i].children[j+2].style.backgroundColor === 'green') {
                            from.children[i].children[j+2].style.backgroundColor = 'blue';
                        }
                    }
                })
            }
            if (from.children[i].children[j].innerHTML === 'Special Col') {
                from.children[i].children[j].addEventListener('click', () => {
                    if (from.children[i].children[j].style.backgroundColor === '') {
                        for (let i = 0; i < taskElements.length; i++) {
                            for (let j = 0; j < taskElements[i].length; j++) {
                                if (from.children[i].children[j].style.backgroundColor === '') {
                                    from.children[i].children[j].style.backgroundColor = 'green';
                                }
                            }
                        }
                    }
                    if (from.children[i].children[j].style.backgroundColor === 'green'
                    || from.children[i].children[j].style.backgroundColor === 'blue') {
                        from.children[i].children[j].addEventListener('click', () => {
                            from.children[i].children[j].style.backgroundColor = 'yellow';
                        });
                    }
                })
            }
            if (taskElements[i][j] !== 0 && from.children[i].children[j].innerHTML === 'Col') {
                from.children[i].children[j].addEventListener('click', () => {
                    if (from.children[i].children[j].style.backgroundColor === '' 
                    || from.children[i].children[j].style.backgroundColor === 'green'
                    || from.children[i].children[j].style.backgroundColor === 'blue') {
                        from.children[i].children[j].style.backgroundColor = 'yellow';
                    }
                })
            }
        }
    }
}

/* END TASK 1 */

/* START TASK 2: Your code goes here */

function validate() {
    const phoneRegex = /^(\+380)[\d]{9}$/g;
    let phoneNumber;
    const phoneNumberDom = document.getElementById('phone-number');
    const notification = document.getElementById('notification');
    const submit = document.getElementsByClassName('submit')[0];
    const notificationText = document.getElementById('notification-text');
    phoneNumberDom.addEventListener('keyup', () => {
        phoneNumber = getNumber();
        if (phoneRegex.test(phoneNumber)) {
            notification.style.display = 'none';
            phoneNumberDom.style.borderColor = 'black';
            submit.disabled = false;
        } else { 
            submit.disabled = true;
            phoneNumberDom.style.borderColor = 'rgba(255,128,128,255)';
            notification.style.display = 'block';
            notificationText.innerHTML = 'Type number does not follow format<br>\
            +380*********';
            notificationText.style.backgroundColor = 'rgba(255,128,128,255)';
        }
    })
    send();
}
validate();

function send() {
    document.getElementsByClassName('submit')[0].addEventListener('click', () => {
        document.getElementById('notification').style.display = 'block';
        document.getElementById('notification-text').innerHTML = 'Data was successfully sent';
        document.getElementById('notification-text').style.backgroundColor = 'rgba(0,128,0,255)';
    })
}

function getNumber() {
    return document.getElementById('phone-number').value;
}

/* END TASK 2 */

/* START TASK 3: Your code goes here */

function moveBall() {
    const court = document.getElementById('court');
    const ball = document.getElementById('ball');
    let aScore = 0;
    let aScoreDom = document.getElementById('ascore');
    let bScore = 0;
    let bScoreDom = document.getElementById('bscore');
    court.addEventListener('click', (ev) => {
        const left = ev.offsetX;
        const top = ev.offsetY;
        if (ev.target.id === 'court') {
            ballPosition(left-20, top-20);
        } else if (ev.target.id === 'a-plank-net') {
            ballPosition(left+15, top+132);
            scoreNotification('a');
            resetScoreNotification();
            setTimeout(() => {
                ballPosition(287, 145);
                aScore++;
                aScoreDom.innerHTML = aScore;
            }, 1200);
        } else if (ev.target.id === 'b-plank-net') {
            ballPosition(left+534, top+132);
            scoreNotification('b');
            resetScoreNotification();
            setTimeout(() => {
                ballPosition(287, 145);
                bScore++;
                bScoreDom.innerHTML = bScore;
            }, 1200);
        } else if (ev.target.id === 'a-plank') {
            ballPosition(left+5, top+132);
        } else if (ev.target.id === 'b-plank') {
            ballPosition(left+554, top+132);
        }
        ball.style.transition = 'all 1.2s';
    });
}
moveBall();

function ballPosition(left, top) {
    const ball = document.getElementById('ball');
    ball.style.left = left + 'px';
    ball.style.top = top + 'px';
}

function scoreNotification(team) {
    if (team === 'a') {
        setTimeout(() => {
            document.getElementById('score-noti').style.display = 'flex';
            document.getElementById('score-noti').style.color = 'blue';
            document.getElementById('select-team').innerHTML = 'A';
        }, 1200);
    } else if (team === 'b') {
        setTimeout(() => {
            document.getElementById('score-noti').style.display = 'flex';
            document.getElementById('score-noti').style.color = 'red';
            document.getElementById('select-team').innerHTML = 'B';
        }, 1200);
    }
}

function resetScoreNotification() {
    setTimeout(() => {
        document.getElementById('score-noti').style.display = 'none';
        document.getElementById('select-team').innerHTML = '';
    }, 4200);
}

/* END TASK 3 */
