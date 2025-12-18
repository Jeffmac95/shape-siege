import Game from "./game.js"

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.tabIndex = 0;

const game = new Game(canvas, ctx);

let lastTime = 0;

function animate(timeStamp) {
    const deltaTime = Math.min(timeStamp - lastTime, 100);
    lastTime = timeStamp;

    game.update(deltaTime);
    game.render();
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);