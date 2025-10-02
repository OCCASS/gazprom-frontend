import { Actor, Engine, Color, Keys, CollisionType, Sprite } from "excalibur";

export class PlayerActor extends Actor {
    public score = 0;
    public health: number;
    public catchZones: Actor[] = [];
    public specialStarsCount = 0;

    constructor(x: number, y: number, health: number, sprite: Sprite) {
        super({
            x,
            y,
            z: 1,
            width: sprite.width,
            height: sprite.height,
            color: Color.Transparent,
        });

        this.graphics.add(sprite);

        this.body.collisionType = CollisionType.Active;
        this.body.useGravity = true;
        this.health = health

        const leftHand = new Actor({
            x: -sprite.width / 2 + 25,
            y: -sprite.height / 2 + 60,
            width: 50,
            height: 60,
            color: Color.Transparent
        });

        const rightHand = new Actor({
            x: sprite.width / 2 - 25,
            y: -sprite.height / 2 + 60,
            width: 50,
            height: 60,
            color: Color.Transparent
        });

        this.addChild(leftHand);
        this.addChild(rightHand);

        this.catchZones.push(leftHand, rightHand);
    }

    public handleInput(engine: Engine) {
        const speed = 300;
        if (engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
            this.vel.x = -speed;
        } else if (engine.input.keyboard.isHeld(Keys.ArrowRight)) {
            this.vel.x = speed;
        } else {
            this.vel.x = 0;
        }

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            if (this.vel.y === 0) {
                this.vel.y = -600;
            }
        }
    }

    public increaseScore(value: number) {
        this.score += value
    }

    public increaseSpecialStarsCount() {
        this.specialStarsCount += 1
    }

    public damage() {
        this.health -= 1
    }

    override onPreUpdate(engine: Engine, delta: number) {
        super.onPreUpdate(engine, delta);
        this.handleInput(engine);

        const halfWidth = this.width / 2;
        this.pos.x = Math.max(halfWidth, Math.min(this.pos.x, engine.drawWidth - halfWidth));

        const halfHeight = this.height / 2;
        this.pos.y = Math.max(halfHeight, Math.min(this.pos.y, engine.drawHeight - halfHeight));
    }

    public checkCatch(item: Actor) {
        return this.catchZones.some(zone => {
            const leftA = zone.pos.x - zone.width / 2 + this.pos.x;
            const rightA = zone.pos.x + zone.width / 2 + this.pos.x;
            const topA = zone.pos.y - zone.height / 2 + this.pos.y;
            const bottomA = zone.pos.y + zone.height / 2 + this.pos.y;

            const leftB = item.pos.x - item.width / 2;
            const rightB = item.pos.x + item.width / 2;
            const topB = item.pos.y - item.height / 2;
            const bottomB = item.pos.y + item.height / 2;

            const horizontalOverlap = leftA < rightB && rightA > leftB;
            const verticalOverlap = topA < bottomB && bottomA > topB;

            const isFromTop = topB < topA && bottomB > topA;

            return horizontalOverlap && verticalOverlap && isFromTop;
        });
    }
}
