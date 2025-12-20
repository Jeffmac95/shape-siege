export default class Projectile {
    constructor(game, startX, startY, destX, destY) {
        this.game = game;
        this.x = startX;
        this.y = startY;
        this.destX = destX;
        this.destY = destY;

        const dx = destX - startX;
        const dy = destY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.dx = (dx / distance) || 0;
        this.dy = (dy / distance) || 0;
        this.speed = 6;

        this.width = 6;
        this.height = 6;
        this.color = "#FFFF00";
        this.markedForDeletion = false;
        this.damage = 2;
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

    update(deltaTime) {
        this.x += this.dx * this.speed * (deltaTime / 16.67);
        this.y += this.dy * this.speed * (deltaTime / 16.67);

        const distToDest = Math.hypot(this.destX - this.x, this.destY - this.y);
        if (distToDest < 15) {
            this.markedForDeletion = true;
        }

        if (this.x < 0 || this.x > 1024 || this.y < 0 || this.y > 1024) {
            this.markedForDeletion = true;
        }
    }
}