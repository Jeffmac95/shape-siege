import Game from "./game.js"

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.tabIndex = 0;

const game = new Game(canvas, ctx);

let lastTime = 0;
let fps = 60;
let frameCount = 0;
let fpsTime = 0;

function animate(timeStamp) {
    const deltaTime = Math.min(timeStamp - lastTime, 100);
    lastTime = timeStamp;

    frameCount++;
    fpsTime += deltaTime;
    if (fpsTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        fpsTime = 0;
    }
    game.fps = fps;

    game.update(deltaTime);
    game.render();
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);