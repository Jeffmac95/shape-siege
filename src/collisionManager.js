export default class CollisionManager {
    constructor(game) {
        this.game = game;
    }


    aabb(a, b) {
        return (
            a.x < b.x + b.w &&
            a.x + a.w > b.x &&
            a.y < b.y + b.h &&
            a.y + a.h > b.y 
        );
    }

    projectilesVsMonsters() {
        const projectiles = this.game.projectiles;
        const monsters = this.game.monsters;

        for (const p of projectiles) {
            if (p.markedForDeletion) continue;

            const pb = p.getBounds();

            for (const m of monsters) {
                if (m.markedForDeath) continue;

                const mb = m.getBounds();

                if (this.aabb(pb, mb)) {
                    m.hp -= p.damage;
                    p.markedForDeletion = true;

                    if (m.hp <= 0) {
                        m.markedForDeath = true;
                    }

                    break;
                }
            }
        }
    }

    playerVsMonsters() {
        const player = this.game.player;
        const pb = player.getBounds();

        for (const m of this.game.monsters) {
            if (m.markedForDeath) continue;

            if (this.aabb(pb, m.getBounds())) {
                player.hp -= 1;
            }
        }
    }

    isColliding(entityX, entityY, entityWidth, entityHeight, Map) {
        const left = entityX - entityWidth / 2;
        const right = entityX + entityWidth / 2;
        const top = entityY - entityHeight / 2;
        const bottom = entityY + entityHeight / 2;
        const corners = [
            [left, top],
            [right, top],
            [left, bottom],
            [right, bottom]
        ];
        
        for (const [px,py] of corners) {
            const tileX = Math.floor(px / Map.tileSize);
            const tileY = Math.floor(py / Map.tileSize);
            if (tileX < 0 || tileX >= Map.map[0].length || tileY < 0 || tileY >= Map.map.length ) {
                return true;
            }
            const tile = Map.map[tileY][tileX];
            if (tile === 0 || tile === 2) return true;
        }
        return false;
    }

    update() {
        this.projectilesVsMonsters();
        this.playerVsMonsters();
    }
}