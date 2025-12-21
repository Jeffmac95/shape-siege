export default class WaveManager {
    constructor(game) {
        this.game = game;
        this.currentWave = 0;
        this.waves = [
            { type: "quadron", count: 1, pos: "random", interval: 400 },
            { type: "quadron", count: 2, pos: "random", interval: 400 }
        ];
        this.spawnQueue = [];
        this.isWaveActive = false;
        this.spawnTimer = 0;
        this.waveClearTimer = 0;
        this.timeTilNextWave = 3000;
        this.spawnInterval = 1000;
        this.waveStartTime = 0;
        this.waveDuration = 0;
        this.currentWaveTime = 0;
    }


    startNextWave() {
        if (this.currentWave >= this.waves.length) {
            console.log("You win! All waves cleared!");
            return;
        }

        const waveData = this.waves[this.currentWave];
        this.currentSpawnInterval = waveData.interval || 1000;

        for (let i = 0; i < waveData.count; i++) {
            this.spawnQueue.push({ type: waveData.type, pos: waveData.pos });
        }

        this.isWaveActive = true;
        this.currentWave++;
        this.spawnTimer = 0;
        this.waveStartTime = performance.now();
        this.currentWaveTime = 0;
        console.log(`Wave ${this.currentWave} started!`);
    }

    update(deltaTime) {
        if (!this.isWaveActive && this.game.monsters.length === 0) {
            this.waveClearTimer += deltaTime;
            if (this.waveClearTimer >= this.timeTilNextWave) {
                this.startNextWave();
                this.waveClearTimer = 0;
            }
            return;
        }

        if (this.isWaveActive) {
            this.spawnTimer += deltaTime;
            this.currentWaveTime += deltaTime;

            if (this.spawnQueue.length > 0 && this.spawnTimer >= this.currentSpawnInterval) {
                const spawn = this.spawnQueue.shift();
                const pos = this.getSpawnPosition(spawn.pos);
                this.game.spawnMonster(spawn.type, pos.x, pos.y);
                this.spawnTimer = 0;
            }

            if (this.spawnQueue.length === 0 && this.game.monsters.length === 0) {
                this.isWaveActive = false;
                this.waveClearTimer = 0;
                this.waveDuration = this.currentWaveTime;
            }
        }
    }

    getSpawnPosition(posType) {
        const margin = 50;
        switch (posType) {
            case "random":
                return {
                    x: margin + Math.random() * (1024 - 2 * margin),
                    y: margin + Math.random() * (1024 - 2 * margin)
                };
            case "north":
                return { x: 512, y: 50 };
            case "south":
                return { x: 512, y: 974 };
            case "east":
                return { x: 974, y: 512 };
            case "west":
                return { x: 50, y: 512 };
            default:
                return { x: 512, y: 512 };
        }
    }
}