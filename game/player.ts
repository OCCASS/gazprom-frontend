import { Actor, Engine, Color, Keys, Sprite, CollisionType, BoundingBox } from "excalibur";

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

        const pointer = engine.input.pointers.primary;
        const pointerPos = pointer.lastWorldPos;

        if (pointerPos) {
            this.pos.x = pointerPos.x;
        }
    }

    public increaseScore(value: number) {
        this.score += value;
    }

    public increaseRightHandCount() {
        this.rightHandCount += 1;
        this.updateSprite();
    }

    public increaseLeftHandCount() {
        this.leftHandCount += 1;
        this.updateSprite();
    }

    public increaseSpecialStarsCount() {
        this.specialStarsCount += 1;
    }

    public damage() {
        this.health -= 1;
        localStorage.setItem("health", `${this.health}`);
    }

    override onPreUpdate(engine: Engine, delta: number) {
        super.onPreUpdate(engine, delta);
        this.handleInput(engine);

        const halfWidth = this.width / 2;
        this.pos.x = Math.max(halfWidth, Math.min(this.pos.x, engine.drawWidth - halfWidth));

        const halfHeight = this.height / 2;
        this.pos.y = Math.max(halfHeight, Math.min(this.pos.y, engine.drawHeight - halfHeight));
    }

    /**
     * Проверяет пересечение двух прямоугольников (AABB collision)
     */
    private checkAABBCollision(
        ax: number, ay: number, aw: number, ah: number,
        bx: number, by: number, bw: number, bh: number
    ): boolean {
        const leftA = ax - aw / 2;
        const rightA = ax + aw / 2;
        const topA = ay - ah / 2;
        const bottomA = ay + ah / 2;

        const leftB = bx - bw / 2;
        const rightB = bx + bw / 2;
        const topB = by - bh / 2;
        const bottomB = by + bh / 2;

        return (
            leftA < rightB &&
            rightA > leftB &&
            topA < bottomB &&
            bottomA > topB
        );
    }

    /**
     * Более точная проверка захвата предмета
     */
    public checkCatch(item: Actor): { caught: boolean; type?: string } {
        // Получаем границы предмета
        const itemX = item.pos.x;
        const itemY = item.pos.y;
        const itemWidth = item.width;
        const itemHeight = item.height;

        // Проверяем, находится ли предмет достаточно близко по вертикали
        // (предмет должен быть на уровне рук или чуть выше)
        const playerTop = this.pos.y - this.height / 2;
        const playerBottom = this.pos.y + this.height / 2;
        const itemBottom = itemY + itemHeight / 2;

        // Предмет должен быть в области игрока
        if (itemBottom < playerTop - 20 || itemY > playerBottom) {
            return { caught: false };
        }

        // Проверяем каждую зону захвата
        for (const [zone, type] of this.catchZones) {
            // ВАЖНО: Используем глобальные координаты через getGlobalPos()
            const zoneGlobalPos = zone.getGlobalPos();

            // Проверка AABB коллизии
            const hasCollision = this.checkAABBCollision(
                zoneGlobalPos.x,
                zoneGlobalPos.y,
                zone.width,
                zone.height,
                itemX,
                itemY,
                itemWidth,
                itemHeight
            );

            if (hasCollision) {
                // Дополнительная проверка: предмет падает сверху
                // (его верх был выше верха зоны в предыдущем кадре)
                const itemTop = itemY - itemHeight / 2;
                const zoneTop = zoneGlobalPos.y - zone.height / 2;

                // Мягкая проверка: достаточно, чтобы предмет был выше или на уровне
                if (itemTop <= zoneTop + zone.height) {
                    console.log(`✅ Catch detected!`, {
                        type,
                        zonePos: { x: zoneGlobalPos.x, y: zoneGlobalPos.y },
                        itemPos: { x: itemX, y: itemY },
                        zoneBounds: {
                            left: zoneGlobalPos.x - zone.width / 2,
                            right: zoneGlobalPos.x + zone.width / 2,
                            top: zoneTop,
                            bottom: zoneGlobalPos.y + zone.height / 2
                        },
                        itemBounds: {
                            left: itemX - itemWidth / 2,
                            right: itemX + itemWidth / 2,
                            top: itemTop,
                            bottom: itemBottom
                        }
                    });

                    return { caught: true, type };
                }
            }
        }

        return { caught: false };
    }

    /**
     * Альтернативный метод с использованием встроенных коллизий Excalibur
     * (более надёжный, но требует настройки collisionType у Item)
     */
    public checkCatchUsingExcalibur(item: Actor): { caught: boolean; type?: string } {
        for (const [zone, type] of this.catchZones) {
            // Используем встроенную проверку коллизий Excalibur
            const zoneBounds = zone.body.collider.bounds;
            const itemBounds = item.body.collider.bounds;

            if (zoneBounds.overlaps(itemBounds)) {
                // Проверка, что предмет падает сверху
                const itemTop = item.pos.y - item.height / 2;
                const zoneTop = zone.getGlobalPos().y - zone.height / 2;

                if (itemTop <= zoneTop + zone.height) {
                    console.log(`✅ Catch detected (Excalibur method)!`, { type });
                    return { caught: true, type };
                }
            }
        }

        return { caught: false };
    }
}
