import InputHandler from "./inputHandler.js"
import Player from "./player.js"
import Map from "./map.js"
import Camera from "./camera.js"
import Projectile from "./projectile.js"
import WaveManager from "./waveManager.js"
import Quadron from "./quadron.js"
import CollisionManager from "./collisionManager.js"
import UI from "./UI.js"
import Vertex from "./vertex.js"

export default class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = canvas.width;
        this.height = canvas.height;

        this.input = new InputHandler(this);
        this.map = new Map();
        this.camera = new Camera(1024, 1024); // mapWidth/height in pixels
        this.player = new Player(this);
        this.waveManager = new WaveManager(this);
        this.collisionManager = new CollisionManager(this);
        this.UI = new UI(this);
        this.projectiles = [];
        this.monsters = [];
    }


    spawnProjectile(x, y, destX, destY) {
        this.projectiles.push(new Projectile(this, x, y, destX, destY));
    }

    spawnMonster(type, x, y) {
        let monster;
        if (type === "quadron") {
            monster = new Quadron(this, x, y);
        } else if (type === "vertex") {
            monster = new Vertex(this, x, y);
        }

        if (monster) {
            this.monsters.push(monster);
        }
        console.log(`spawning: ${type}, at: ${x},${y}`);
    }

    update(deltaTime) {
        this.player.update(deltaTime);
        this.camera.follow(this.player);
        this.projectiles = this.projectiles.filter(p => {
            p.update(deltaTime);
            return !p.markedForDeletion;
        });
        //this.monsters.forEach(m => m.update(deltaTime));
        this.monsters = this.monsters.filter(m => {
            return !m.markedForDeath;
        });
        this.waveManager.update(deltaTime);
        this.collisionManager.update();
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.map.drawTiles(this.ctx, this.camera);
        this.player.draw(this.ctx, this.camera);
        this.projectiles.forEach(p => p.draw(this.ctx, this.camera));
        this.monsters.forEach(m => m.draw(this.ctx, this.camera));
        this.UI.draw(this.ctx);
    }
}