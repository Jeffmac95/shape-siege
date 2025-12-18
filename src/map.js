export default class Map {
    constructor() {
        this.map = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0],
            [0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0],
            [0,1,3,2,2,3,3,3,3,3,3,2,2,3,1,0],
            [0,1,3,2,2,3,3,3,3,3,3,2,2,3,1,0],
            [0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0],
            [0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0],
            [0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0],
            [0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0],
            [0,1,3,2,2,3,3,3,3,3,3,2,2,3,1,0],
            [0,1,3,2,2,3,3,3,3,3,3,2,2,3,1,0],
            [0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0],
            [0,1,3,3,3,3,3,3,3,3,3,3,3,3,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ];
        this.tileColors = {
            0: "#000000",
            1: "#343A40",
            2: "#7209B7",
            3: "#432818"
        }
        this.tileSize = 64;
    }

    drawTiles(ctx, camera) {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const tile = this.map[y][x];

                ctx.fillStyle = this.tileColors[tile];
                ctx.fillRect(
                    x * this.tileSize - camera.x,
                    y * this.tileSize - camera.y, 
                    this.tileSize,
                    this.tileSize
                );
            }
        }
    }

    isColliding(playerX, playerY, playerWidth, playerHeight) {
        const left = playerX - playerWidth / 2;
        const right = playerX + playerWidth / 2;
        const top = playerY - playerHeight / 2;
        const bottom = playerY + playerHeight / 2;

        const corners = [
            [left, top],
            [right, top],
            [left, bottom],
            [right, bottom]
        ];

        for (const [px,py] of corners) {
            const tileX = Math.floor(px / this.tileSize);
            const tileY = Math.floor(py / this.tileSize);

            if (tileX < 0 || tileX >= this.map[0].length ||
                tileY < 0 || tileY >= this.map.length
            ) {
                return true;
            }

            const tile = this.map[tileY][tileX];

            if (tile === 0 || tile === 2) return true;
        }

        return false;
    }
}