
/***** Start Game Button *****/

let startGame = document.querySelector('#startGame');
let startGameBox = document.querySelector('#startGameBox');
let removeBox = document.querySelector('.area');

let level1Start = document.querySelector('#level1');
let level2Start = document.querySelector('#level2');
let level3Start = document.querySelector('#level3');
let level4Start = document.querySelector('#level4');
let level5Start = document.querySelector('#level5');
let level6Start = document.querySelector('#level6');
let level7Start = document.querySelector('#level7');
let gameComplete = document.querySelector('#gameComplete');
let bgOverlay = document.querySelector('.bgOverlay');
let restart = document.querySelector('#restart');

function gameStart() {
    startGameBox.classList.add('hideDiv');

    startLevel1();
}

startGame.addEventListener("click", gameStart);

/***** Level 1: CLICK EVENT *****/

function startLevel1() {
    level1Start.classList.remove('hideDiv');

    animateDiv('.movingBox1');
    animateDiv('.movingBox2');
    animateDiv('.movingBox3');
    animateDiv('.movingBox4');
};

function makeNewPosition(){
    
    // Get viewport dimensions (Removes the dimension of the div)
    var h = $(window).height();
    var w = $(window).width();
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];
}

function animateDiv(divBox){

    var newq = makeNewPosition();

    $(divBox).animate({ top: newq[0], left: newq[1] }, 1000,   function() {
      animateDiv(divBox);
    });

    let movingBox4 = document.querySelector('.movingBox4');
    
    function level1End() {
        removeBox.classList.add('hideDiv');

        $('.movingBox1').stop();
        $('.movingBox2').stop();
        $('.movingBox3').stop();
        $('.movingBox4').stop();

        level1Start.classList.add('hideDiv');

        level2Start.classList.remove('hideDiv');
    }

    movingBox4.addEventListener("click", level1End);
};

/***** Level 2: MOUSEOVER EVENT *****/

let earth = document.querySelector('.earth');

function level2End() {
    level2Start.classList.add('hideDiv');
    level3Start.classList.remove('hideDiv');
}

earth.addEventListener("mouseover", function() {

    earth.classList.add('zoom');
    document.body.style.overflow = "hidden";

    var timeSet;

    $(earth).mouseover(function() {
        timeSet = setTimeout(function(){
            level2End();
    }, 3000);
    }).mouseout(function() {
        clearTimeout(timeSet);
    });
    
});

/***** Level 3: KEY PRESS *****/

let topStart = true;
let left = false;
let down = false;
let right = false;

let counterTop = 2;
let counterLeft = 1;
let counterDown = 3;
let counterRight = 2;

let key1 = document.querySelector('#key_1');
let key2 = document.querySelector('#key_2');
let key3 = document.querySelector('#key_3');
let key4 = document.querySelector('#key_4');

let key_counter1 = document.querySelector('#key_counter1');
let key_counter2 = document.querySelector('#key_counter2');
let key_counter3 = document.querySelector('#key_counter3');
let key_counter4 = document.querySelector('#key_counter4');

let times1 = document.querySelector('.times1');
let times3 = document.querySelector('.times3');
let times4 = document.querySelector('.times4');

key_counter1.innerHTML = counterTop;
key_counter2.innerHTML = counterLeft;
key_counter3.innerHTML = counterDown;
key_counter4.innerHTML = counterRight;

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    // top arrow
    if (e.keyCode == '38') {

        counterTop--;
        key_counter1.innerHTML = counterTop;

        if(counterTop == 1) {
            times1.innerHTML = "";
        }

        if(counterTop == 0) {
            key1.classList.toggle('hideDiv');
            key2.classList.toggle('hideDiv');

            topStart = false;
            left = true;
        }
    }

    // left arrow
    if(left === true) {

        if (e.keyCode == '37') {
            key2.classList.toggle('hideDiv');
            key3.classList.toggle('hideDiv');

            left = false;
            down = true;
        }
    }

    // down arrow
    if (down === true) {

        if(e.keyCode == '40') {

            counterDown--;
            key_counter3.innerHTML = counterDown;

            if(counterDown == 1) {
                times3.innerHTML = "";
            }

            if(counterDown == 0) {
                key3.classList.toggle('hideDiv');
                key4.classList.toggle('hideDiv');

                down = false;
                right = true;
            }
        }
    }

    // right arrow
    if(right === true) {

        if (e.keyCode == '39') {

            counterRight--;
            key_counter4.innerHTML = counterRight;

            if(counterRight == 1) {
                times4.innerHTML = "";
            }
    
            if(counterRight == 0) {
                key4.classList.toggle('hideDiv');

                level3Start.classList.add('hideDiv');
                level4Start.classList.remove('hideDiv');
                level4Start.classList.add('completed');
            }
        }
    }
}

/***** Level 4: RESIZE EVENT *****/

let divBox = document.querySelector("#resizeDiv");
let showSize = document.querySelector("#currentSize");

let newWidth = window.innerWidth;
let newHeight = window.outerHeight;

showSize.innerHTML = newWidth + " x " + newHeight;

function reportWindowSize() {

    let newWidth = window.innerWidth;
    let newHeight = window.outerHeight;

    showSize.innerHTML = newWidth + " x " + newHeight;

    if(newWidth == 1000 && newHeight == 600) {
        level4Start.classList.add('hideDiv');
        level5Start.classList.remove('hideDiv');

        input.value = "Teal";
        body.style.backgroundColor = input.value;
    }
}

window.addEventListener('resize', reportWindowSize);

/***** Level 5: INPUT EVENT *****/

let input = document.querySelector('#changeBG');
let log = document.querySelector('#values');
let bgChangeComplete = document.querySelector('#bgChangeComplete');
let body = document.body;

if(log.value == null) {
    log.innerHTML = "Teal";
}

input.addEventListener('input', updateValue);

function updateValue() {
    log.innerHTML = input.value;
    body.style.backgroundColor = input.value;

    if(input.value == "orange") {
        bgChangeComplete.classList.toggle('hideDiv');
        bgChangeComplete.innerHTML = "<span class='large'>Completed!</span> After 5 seconds you will get to next level!";

        setTimeout(function() {
            bgChangeComplete.classList.toggle('hideDiv');
            level5Start.classList.add('hideDiv');
            level6Start.classList.remove('hideDiv');

            input.value = "";
            body.style.backgroundColor = "#072515";
        }, 5000);
    }
}

/***** Level 6: SUBMIT EVENT *****/

let form = document.querySelector('#formCal');
let formBtn = document.querySelector('#formBtn');
let output = document.querySelector('#calculation');
let calculationComplete = document.querySelector('#calculationComplete');

let number1;
let number2;
let operator;

document.querySelector('#firstVal').addEventListener('change', function(event) {
    number1 = event.target.value;
});

document.querySelector('#secondVal').addEventListener('change', function(event) {
    number2 = event.target.value;
});

document.querySelector('#operator').addEventListener('change', function(event) {
    operator = event.target.value;
});

operator = "+";

if(output.value == null) {
    output.innerHTML = "0";
}

formBtn.onclick = function() {

    if(operator == "+") {
        output.innerHTML = +number1 + +number2;
    }

    else if(operator == "-") {
        output.innerHTML = number1 - number2;
    }

    else if(operator == "*") {
        output.innerHTML = number1 * number2;
    }

    else if(operator == "/") {
        output.innerHTML = number1 / number2;
    }

    if(output.innerHTML == "394.5") {
        calculationComplete.innerHTML = "<span class='large'>Completed!</span> After 5 seconds you will get to next level!";
        calculationComplete.classList.toggle('hideDiv');

        setTimeout(() => {
            level6End(); 
            form.addEventListener('submit', submitForm);
        }, 5000);

    }
};

function level6End() {
    calculationComplete.classList.toggle('hideDiv');
    level6Start.classList.add('hideDiv');
    level7Start.classList.remove('hideDiv');
}

function submitForm(e) {
    e.preventDefault();
}

/***** Level 7: DRAG, DROP EVENT (AT HTML) *****/

let car1Display = document.querySelector('#optionCar');

let car1drop = document.querySelector('#option1');
let car2drop = document.querySelector('#option2');
let car3drop = document.querySelector('#option3');

var car1 = { 
    type: "Mercedes", 
    model: "C63 AMG",
};

car1Display.innerHTML = car1.type + ": " + car1.model;

function dragStart(event) {
    event.dataTransfer.setData("Text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));
}

$('#option1_drop').bind('DOMSubtreeModified', function () {
    car2drop.classList.toggle('hideDiv');
    car3drop.classList.toggle('hideDiv');
    bgOverlay.classList.toggle('hideDiv');
});