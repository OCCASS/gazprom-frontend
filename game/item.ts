import { Actor, Sprite } from "excalibur";

export class Item extends Actor {
    private speed: number;
    public cost: number;
    public damage: boolean;
    public special: boolean;

    constructor(x: number, speed: number = 300, cost: number = 10, sprite: Sprite, special: boolean, damage: boolean) {
        super({
            x,
            y: 0,
            z: 0,
            width: sprite.width,
            height: sprite.height,
        });

        this.graphics.add(sprite)
        this.speed = speed;
        this.cost = cost
        this.damage = damage
        this.special = special
    }

    override onPreUpdate(engine: ex.Engine, delta: number) {
        super.onPreUpdate(engine, delta);

        this.pos.y += this.speed * (delta / 1000);

        if (this.pos.y - this.height / 2 > engine.drawHeight) {
            this.kill();
        }
    }

    public checkCollision(player: Actor) {
        const leftA = this.pos.x - this.width / 2;
        const rightA = this.pos.x + this.width / 2;
        const topA = this.pos.y - this.height / 2;
        const bottomA = this.pos.y + this.height / 2;

        const leftB = player.pos.x - player.width / 2;
        const rightB = player.pos.x + player.width / 2;
        const topB = player.pos.y - player.height / 2;
        const bottomB = player.pos.y + player.height / 2;

        if (leftA < rightB && rightA > leftB && topA < bottomB && bottomA > topB) {
            this.kill();
            console.log("Собран предмет!");
            return true;
        }
        return false;
    }
}
