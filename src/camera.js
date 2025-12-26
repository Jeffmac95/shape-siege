export default class Camera {
    constructor(mapWidth, mapHeight) {
        this.gameWidth = 600;
        this.gameHeight = 500;
        this.x = 0;
        this.y = 0;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
    }

    follow(target) {
        this.x = target.x - this.gameWidth / 2;
        this.y = target.y - this.gameHeight / 2;

        this.x = Math.max(0, Math.min(this.x, this.mapWidth - this.gameWidth));
        this.y = Math.max(0, Math.min(this.y, this.mapHeight - this.gameHeight));
    }
}