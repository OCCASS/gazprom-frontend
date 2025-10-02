import { Actor, Engine, Color, Keys, Sprite, CollisionType } from "excalibur";

export class PlayerActor extends Actor {
    public score = 0;
    public leftHandCount = 0;
    public rightHandCount = 0;
    public health: number;
    public catchZones: [Actor, string][] = [];
    public specialStarsCount = 0;

    private sprites: {
        center: Sprite;
        left1: Sprite;
        left2: Sprite;
        left3: Sprite;
        left4: Sprite;
        right1: Sprite;
        right2: Sprite;
        right3: Sprite;
        right4: Sprite;
    };

    constructor(x: number, y: number, health: number, sprites: {
        center: Sprite;
        left1: Sprite;
        left2: Sprite;
        left3: Sprite;
        left4: Sprite;
        right1: Sprite;
        right2: Sprite;
        right3: Sprite;
        right4: Sprite;
    }) {
        super({
            x, y, z: 1,
            width: sprites.center.width,
            height: sprites.center.height,
            color: Color.Transparent,
        });

        this.sprites = sprites;
        this.graphics.add(sprites.center);
        this.body.collisionType = CollisionType.Active;
        this.body.useGravity = true;
        this.health = health;

        const leftHand = new Actor({
            x: -sprites.center.width / 2 + 25,
            y: -sprites.center.height / 2 + 60,
            width: 50,
            height: 60,
            color: Color.Transparent
        });

        const rightHand = new Actor({
            x: sprites.center.width / 2 - 25,
            y: -sprites.center.height / 2 + 60,
            width: 50,
            height: 60,
            color: Color.Transparent
        });

        this.addChild(leftHand);
        this.addChild(rightHand);

        this.catchZones.push([leftHand, "left"], [rightHand, "right"]);
    }

    private updateSprite() {
        const diff = this.rightHandCount - this.leftHandCount;

        let newSprite: Sprite;

        if (diff === 0) {
            newSprite = this.sprites.center;
        } else if (diff >= 1 && diff <= 4) {
            const spriteKey = `right${Math.min(diff, 4)}` as keyof typeof this.sprites;
            newSprite = this.sprites[spriteKey];
        } else if (diff <= -1 && diff >= -4) {
            const spriteKey = `left${Math.min(Math.abs(diff), 4)}` as keyof typeof this.sprites;
            newSprite = this.sprites[spriteKey];
        } else if (diff > 4) {
            newSprite = this.sprites.right4;
        } else {
            newSprite = this.sprites.left4;
        }

        this.graphics.use(newSprite);
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
    }

    public increaseScore(value: number) {
        this.score += value;
    }

    public increaseRightHandCount() {
        this.rightHandCount += 1;
        this.updateSprite()
    }

    public increaseLeftHandCount() {
        this.leftHandCount += 1;
        this.updateSprite()
    }

    public increaseSpecialStarsCount() {
        this.specialStarsCount += 1;
    }

    public damage() {
        this.health -= 1
        localStorage.setItem("health", `${this.health}`)
    }

    override onPreUpdate(engine: Engine, delta: number) {
        super.onPreUpdate(engine, delta);
        this.handleInput(engine);

        const halfWidth = this.width / 2;
        this.pos.x = Math.max(halfWidth, Math.min(this.pos.x, engine.drawWidth - halfWidth));

        const halfHeight = this.height / 2;
        this.pos.y = Math.max(halfHeight, Math.min(this.pos.y, engine.drawHeight - halfHeight));
    }

    public checkCatch(item: Actor): { caught: boolean; type?: string } {
        const result = this.catchZones.find(([zone, type]) => {
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

        if (result) {
            return { caught: true, type: result[1] };
        }

        return { caught: false };
    }
}
