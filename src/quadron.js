export default class Quadron {
    constructor(game, x, y) {
        this.game = game;
        this.width = 30;
        this.height = 30;
        this.x = x;
        this.y = y;
        this.color = "#FF0000";
        this.speed = 2;
        this.markedForDeath = false;
        this.hp = 6;
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
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.x - this.width / 2 - camera.x,
            this.y - this.height / 2 - camera.y,
            this.width,
            this.height
        );
    }
}