export default class Camera {
    constructor(canvas, mapWidth, mapHeight) {
        this.width = 600;
        this.height = 500;
        this.x = 0;
        this.y = 0;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
    }

    follow(target) {
        this.x = target.x - this.width / 2;
        this.y = target.y - this.height / 2;

        this.x = Math.max(0, Math.min(this.x, this.mapWidth - this.width));
        this.y = Math.max(0, Math.min(this.y, this.mapHeight - this.height));
    }
}