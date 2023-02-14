const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const rocketSize = { height: 20, width: 20 };
let rocketSpeed = 90;

function playSound(type) {
    var audio = type == "rocket" ? new Audio("./rocket.wav") : new Audio("./iron_dome.wav");
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

    let rocketStartPos = { x: -200, y: 500 };

    let rocketStepSize = (finalPos.x - rocketStartPos.x) / 10;

    let yStepSize = (finalPos.y - rocketStartPos.y) / rocketStepSize;

    let rocketCurrentPos = rocketStartPos;

    
    let ironDomeStartPos = { x: 600, y: 500 };
    
    let ironDomeStepSize = (finalPos.x - ironDomeStartPos.x) / 10;
    
    let yIronDomeStepSize = (finalPos.y - ironDomeStartPos.y) / 10;
    
    let ironDomeCurrentPos = ironDomeStartPos;
    
    playSound("rocket");
    
    let rocketIndex = 0;
    let ironDomeIndex = 0;

    let rocketInterval = setInterval(() => {
        if (rocketIndex <= rocketStepSize) {
            clearSpecificDot(rocketCurrentPos.x - 10, rocketCurrentPos.y - yStepSize);
            startRocket(rocketCurrentPos.x, rocketCurrentPos.y);
            rocketCurrentPos = {
                x: rocketCurrentPos.x + 10,
                y: rocketCurrentPos.y + yStepSize,
            };
            return rocketIndex++;
        }
        clearCanvas();
        clearInterval(rocketInterval);
    }, rocketSpeed);

    let ironDomeInterval = setInterval(() => {
        if (ironDomeIndex < 10) {
            clearSpecificDot(ironDomeCurrentPos.x - ironDomeStepSize, ironDomeCurrentPos.y - yIronDomeStepSize);
            startRocket(ironDomeCurrentPos.x, ironDomeCurrentPos.y);
            ironDomeCurrentPos = {
                x: ironDomeCurrentPos.x + ironDomeStepSize,
                y: ironDomeCurrentPos.y + yIronDomeStepSize,
            };
            return ironDomeIndex++;
        }
        clearCanvas();
        playSound("iron_dome");
        clearInterval(ironDomeInterval);
    }, (rocketStepSize * rocketSpeed) / 10);
};

setInterval(() => {
    initWar();
}, 3000);
