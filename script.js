const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const rocketSize = { height: 20, width: 20 };
let rocketSpeed = 90;

function playSound(type) {
    var audio = type == 'rocket' ? new Audio("./rocket.wav") : new Audio("./iron_dome.wav");
    audio.play();
}

const getRandomStartPoint = () => {
    return {
        x: -Math.floor(Math.random() * 400 + 200),
        y: ctx.canvas.height,
    };
};

const getRandomFinalPoint = () => {
    return {
        x: Math.floor(Math.random() * 600) + 100,
        y: Math.floor(Math.random() * 250),
    };
};

const clearCanvas = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
};

const startRocket = (posX, posY) => {
    const rocket = new Image();
    rocket.onload = function () {
        ctx.drawImage(rocket, posX, posY, rocketSize.width, rocketSize.height);
    };
    rocket.src = "./rocket.png";
};

const clearSpecificDot = (x, y) => {
    ctx.clearRect(x, y, 20, 20);
    ctx.beginPath();
};

const initWar = () => {
    let finalPos = getRandomFinalPoint();

    console.log("finalPos:" + JSON.stringify(finalPos));

    let startPos = { x: -200, y: 500 };

    let stepLength = (finalPos.x - startPos.x) / 10;

    console.log("stepLength:" + stepLength);

    let yStepsSize = (finalPos.y - startPos.y) / stepLength;

    console.log("yStepsSize:" + yStepsSize);

    let currentPosition = startPos;

    let index = 0;
    let indexx = 0;
    let ironDomeStartPos = { x: 600, y: 500 };
    let ironDomeStartStepLengthx = (finalPos.x - ironDomeStartPos.x) / 10;
    let ironDomeStartStepLengthy = (finalPos.y - ironDomeStartPos.y) / 10;
    let ironDomeCurrentPos = ironDomeStartPos;

    playSound('rocket');

    let rocketInterval = setInterval(() => {
        if (index <= stepLength) {
            clearSpecificDot(
                currentPosition.x - 10,
                currentPosition.y - yStepsSize
            );
            startRocket(currentPosition.x, currentPosition.y);
            currentPosition = {
                x: currentPosition.x + 10,
                y: currentPosition.y + yStepsSize,
            };
            return index++;
        }
        clearCanvas();
        clearInterval(rocketInterval);
    }, rocketSpeed);

    let rocketIntervall = setInterval(() => {
        if (indexx < 10) {
            clearSpecificDot(
                ironDomeCurrentPos.x - ironDomeStartStepLengthx,
                ironDomeCurrentPos.y - ironDomeStartStepLengthy
            );
            startRocket(ironDomeCurrentPos.x, ironDomeCurrentPos.y);
            ironDomeCurrentPos = {
                x: ironDomeCurrentPos.x + ironDomeStartStepLengthx,
                y: ironDomeCurrentPos.y + ironDomeStartStepLengthy,
            };
            return indexx++;
        }
        clearCanvas();
        playSound('iron_dome');
        clearInterval(rocketIntervall);
    }, (stepLength * rocketSpeed) / 10);
};

setInterval(() => {
    initWar();
}, 3000);
