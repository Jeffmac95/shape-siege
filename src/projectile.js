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
        this.speed = 7;

        this.width = 4;
        this.height = 4;
        this.color = "#FFFF00";
        this.markedForDeletion = false;
    }

    draw(ctx, camera) {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.x - camera.x,
            this.y - camera.y,
            this.width,
            this.height
        );
    }

    update(deltaTime) {
        this.x += this.dx * this.speed * (deltaTime / 16.67);
        this.y += this.dy * this.speed * (deltaTime / 16.67);

        if (this.game.map.isColliding(this.x, this.y, this.width, this.height)) {
            this.markedForDeletion = true;
            return;
        }

        const distToDest = Math.hypot(this.destX - this.x, this.destY - this.y);
        if (distToDest < 15) {
            this.markedForDeletion = true;
        }

        if (this.x < 0 || this.x > 1024 || this.y < 0 || this.y > 1024) {
            this.markedForDeletion = true;
        }
    }
}