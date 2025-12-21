export default class UI {
    constructor(game) {
        this.game = game;
        this.font = "20px Arial";
        this.subFont = "12px Arial";
        this.color = "#FFFFFF";
        this.panelColor = "#000000"
    }

    draw(ctx) {
        // panel
        ctx.fillStyle = this.panelColor;
        ctx.fillRect(600, 0, 200, 500);

        // fps
        ctx.fillStyle = this.color;
        if (this.game.fps < 20) ctx.fillStyle = "#FF0000";
        ctx.font = this.subFont;
        ctx.fillText(`FPS: ${this.game.fps}`, 756, 10);

        ctx.fillStyle = this.color;
        ctx.font = this.font;

        // hp
        ctx.fillText(`HP: ${this.game.player.hp}`, 610, 80);
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(600, 100, this.game.player.hp * 2, 20);
        ctx.strokeStyle = "#FFFFFF";
        ctx.strokeRect(600, 100, 200, 20);

        // waves
        ctx.fillStyle = this.color;
        ctx.fillText(`Wave: ${this.game.waveManager.currentWave}`, 610, 200);
        if (this.game.waveManager.isWaveActive) {
            const seconds = (this.game.waveManager.currentWaveTime / 1000).toFixed(2);
            ctx.fillText(`Wave time: ${seconds}`, 610, 240);
        } else {
            const seconds = (this.game.waveManager.waveDuration / 1000).toFixed(2);
            ctx.fillText(`Prev. wave time: ${seconds}`, 610, 240);
        }
    }
}