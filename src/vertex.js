export default class Vertex {
    constructor(game, x, y) {
        this.game = game;
        this.width = 30;
        this.height = 30;
        this.x = x;
        this.y = y;
        this.color = "#00FF00";
        this.speed = 2;
        this.markedForDeath = false;
        this.hp = 10;
    }


    getBounds() {
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2,
            w: this.width,
            h: this.height
        };
    }

    draw(ctx, camera) {
        const screenX = this.x - camera.x;
        const screenY = this.y - camera.y;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(screenX, screenY - this.height / 2);
        ctx.lineTo(screenX + this.width / 2, screenY + this.height / 2);
        ctx.lineTo(screenX - this.width / 2, screenY + this.height / 2);
        ctx.closePath();
        ctx.fill();
    }
}