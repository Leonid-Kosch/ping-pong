const WIDTH = 550;
const HEIGHT = 400;
const BALLRADIUS = 20;
let startButton = document.querySelector('#startButton');
let reStartButton = document.querySelector('#reStart');
let pauseButton = document.querySelector('#pause');
let playField = SVG().addTo('.game').size(WIDTH, HEIGHT).stroke({width: 10, color: 'blue'});
let backgroundPlayField = playField.rect(WIDTH, HEIGHT).fill('#eee154');
let playBall = playField.circle().radius(BALLRADIUS).cx(WIDTH / 2).cy(HEIGHT / 2).fill('blue').stroke({width:1, color: 'black'});
let rocketRight = playField.rect(15, 80).fill('red').stroke({width:1, color: 'black'}).move(WIDTH - 30, HEIGHT / 2 - 40);
let rocketLeft = playField.rect(18, 80).fill('red').stroke({width:1, color: 'blue'}).move(15, HEIGHT / 2 - 40);
let stepX = 2;
let stepY = 2;
let stepRocketRight = 0;
let stepRocketLeft = 0;
let rightScoreSpan = document.querySelector('#rightScore');
let leftScoreSpan = document.querySelector('#leftScore');
let rightScore = 0;
let leftScore = 0;
let pop = document.createElement('audio');
pop.setAttribute('src', '../audio/pop.mp3');
startButton.onclick = function() {
    startRocket = setInterval(moveRocket, 10);
    startOperation();
    start = setInterval(moveBall, 10);
};
reStartButton.onclick = function(){
    clearInterval(start);
    startOperation();
};
function startOperation(){
    startButton.disabled = false;
    rightScore = 0;
    leftScore = 0;
    rightScoreSpan.innerHTML = rightScore;
    leftScoreSpan.innerHTML = leftScore;
    rocketRight.y(HEIGHT / 2 - 40);
    rocketLeft.y(HEIGHT / 2 - 40);
    playBall.cx(WIDTH / 2);
    playBall.cy(HEIGHT / 2);
};
pauseButton.onclick = function(){
    if(pauseButton.innerHTML == 'Пауза'){
        pauseButton.innerHTML = 'Возобновить';
    } else{
        pauseButton.innerHTML = 'Пауза';
    }
}
function moveBall () {
    if(pauseButton.innerHTML == 'Пауза'){
        let x = playBall.cx();
        let y = playBall.cy();
        if(x + BALLRADIUS > WIDTH || x - BALLRADIUS < 0){
            clearInterval(start);
            if(x + BALLRADIUS > WIDTH){
                leftScore = leftScore + 1;
                leftScoreSpan.innerHTML = leftScore;
            }
            if(x - BALLRADIUS < 0){
                rightScore = rightScore + 1;
                rightScoreSpan.innerHTML = rightScore;
            }
            if(rightScore == 5 || leftScore == 5){
                if(rightScore == 5){
                    setTimeout(() => {
                        alert('Победила правая рука!');
                    }, 1000); 
                }
                if(leftScore == 5){
                    setTimeout(() => {
                        alert('Победила левая рука!');
                    }, 1000);
                }
                setTimeout(() => {
                    playBall.cx(WIDTH / 2);
                    playBall.cy(HEIGHT / 2);
                    startButton.disabled = false;
                }, 500);
            }
            else{
                setTimeout(() => {
                    playBall.cx(WIDTH / 2);
                    playBall.cy(HEIGHT / 2);
                    start = setInterval(moveBall, 10);
                }, 500);
            }
        }
        if(y+BALLRADIUS > HEIGHT || y - BALLRADIUS < 0){
            stepY = -stepY
        }
        if(playBall.cx() + BALLRADIUS > rocketRight.x() && playBall.cx() + BALLRADIUS < rocketRight.x() + 5 && playBall.cy() > rocketRight.y() && playBall.cy() < rocketRight.y() + 80){
            stepX = -stepX;
            pop.play();
        }
        if(playBall.cx() - BALLRADIUS < rocketLeft.x() + 15 && playBall.cx() - BALLRADIUS < rocketLeft.x() + 10 && playBall.cy() > rocketLeft.y() && playBall.cy() < rocketLeft.y() + 80){
            stepX = -stepX;
            pop.play();
        }
        x = x + stepX;
        y = y + stepY;
        playBall.cx(x);
        playBall.cy(y);
    }
};
function moveRocket(){
    if(pauseButton.innerHTML == 'Пауза'){
        rocketRight.dy(stepRocketRight);
        rocketLeft.dy(stepRocketLeft);
        if(rocketRight.y() < 5){
            rocketRight.y(5);
        }
        if(rocketRight.y() > HEIGHT - 85){
            rocketRight.y(HEIGHT - 85);
        }
        if(rocketLeft.y() < 5){
            rocketLeft.y(5);
        }
        if(rocketLeft.y() > HEIGHT - 85){
            rocketLeft.y(HEIGHT - 85);
        }
    }
};
document.addEventListener('keydown', function(){
    let keyCode = event.keyCode;
    if(keyCode == 38){
        stepRocketRight = -5;
    }
    if(keyCode == 40){
        stepRocketRight = 5;
    }
});
document.addEventListener('keyup', function(){
    let keyCode = event.keyCode;
    if(keyCode == 38 || keyCode == 40){
        stepRocketRight = 0;
    }
});
document.addEventListener('keydown', function(){
    let keyCode = event.keyCode;
    if(keyCode == 87){
        stepRocketLeft = -5;
    }
    if(keyCode == 83){
        stepRocketLeft = 5;
    }
});
document.addEventListener('keyup', function(){
    let keyCode = event.keyCode;
    if(keyCode == 87 || keyCode == 83){
        stepRocketLeft = 0;
    }
});