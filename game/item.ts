import { Actor, CollisionType, Sprite } from "excalibur";

export class Item extends Actor {
    private speed: number;
    public cost: number;
    public damage: boolean;
    public special: boolean;
    private collected = false

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
        this.body.collisionType = CollisionType.Passive;
    }

    override onPreUpdate(engine: ex.Engine, delta: number) {
        super.onPreUpdate(engine, delta);

        this.pos.y += this.speed * (delta / 1000);

        if (this.pos.y - this.height / 2 > engine.drawHeight) {
            this.kill();
        }
    }

    public isCollected(): boolean {
        return this.collected;
    }

    public markAsCollected(): void {
        this.collected = true;
    }
}
