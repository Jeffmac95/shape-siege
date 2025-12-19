export default class Player {
    constructor(game) {
        this.game = game;
        this.width = 30;
        this.height = 30
        this.x = 128;
        this.y = 128;
        this.color = "#FF0000";
        this.attackCooldown = 0;
        this.attackCooldownMax = 600;
    }

    draw(ctx, camera) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            this.x - camera.x,
            this.y - camera.y,
            15,
            0,
            Math.PI*2
        );
        ctx.fill();
    }

    shoot(mouseScreenPos) {
        const worldX = mouseScreenPos.x + this.game.camera.x;
        const worldY = mouseScreenPos.y + this.game.camera.y;

        const dx = worldX - this.x;
        const dy = worldY - this.y;
        const dist = Math.hypot(dx, dy) || 1;

        const offset = 20; // push projectile out of player
        const spawnX = this.x + (dx / dist) * offset;
        const spawnY = this.y + (dy / dist) * offset;

        this.game.spawnProjectile(spawnX, spawnY, worldX, worldY);
    }

    update(deltaTime) {
        const input = this.game.input;

        let dx = 0;
        let dy = 0;
        const speed = 3 * (deltaTime / 16.67);

        if (input.isKeyDown('w')) dy -= speed;
        if (input.isKeyDown('a')) dx -= speed;
        if (input.isKeyDown('s')) dy += speed;
        if (input.isKeyDown('d')) dx += speed;

        this.attackCooldown -= deltaTime;
        if (input.isMouseDown(0) && this.attackCooldown <= 0) {
            this.shoot(input.mousePos);
            this.attackCooldown = this.attackCooldownMax;
        }

        if (!this.game.map.isColliding(this.x + dx, this.y, this.width, this.height)) this.x += dx;
        if (!this.game.map.isColliding(this.x, this.y + dy, this.width, this.height)) this.y += dy;
    }
}