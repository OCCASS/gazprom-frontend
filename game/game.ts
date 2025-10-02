import { Actor, Engine, ImageSource, Color, DisplayMode, CollisionType, Label, Font, Vector, TextAlign } from "excalibur";
import { CustomLoader } from "./custom-loader";
import { PlayerActor } from "./player";
import { Item } from "./item";
import { GameResult } from "./types";
import { MAX_HEALTH } from "./constants";

const HEALTH_SPACING = 5
const MAX_SPEED = 500

export function initialize(canvasElement: HTMLCanvasElement) {
    canvasElement.style.backgroundImage = "url('/background.png')";
    canvasElement.style.backgroundSize = "100% auto";
    canvasElement.style.backgroundPosition = "bottom center";
    canvasElement.style.backgroundRepeat = "no-repeat";

    return new Engine({
        canvasElement,
        width: window.innerWidth,
        height: window.innerHeight,
        displayMode: DisplayMode.FitScreen,
        backgroundColor: Color.Transparent,
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
        },
    });
}

export async function start(
    game: Engine,
    initialHealth: number,
    starsCount: number,
    onGameEnd: (result: GameResult) => void,
    onSpecialItemCollect: (number: number) => void,
    isPause: () => boolean
) {
    const resources = {
        player: new ImageSource("/player.png"),
        coin: new ImageSource("/coin.png"),
        star: new ImageSource("/star.png"),
        thorn: new ImageSource("/thorn.png"),
        heartFull: new ImageSource("/heart_full.png"),
        heartEmpty: new ImageSource("/heart_empty.png"),
        platform: new ImageSource("/platform.png"),
        playerLeft1: new ImageSource("/player_left_1.png"),
        playerLeft2: new ImageSource("/player_left_2.png"),
        playerLeft3: new ImageSource("/player_left_3.png"),
        playerLeft4: new ImageSource("/player_left_4.png"),
        playerRight1: new ImageSource("/player_right_1.png"),
        playerRight2: new ImageSource("/player_right_2.png"),
        playerRight3: new ImageSource("/player_right_3.png"),
        playerRight4: new ImageSource("/player_right_4.png"),
    };

    const loader = new CustomLoader();
    loader.addResource(resources.player);
    loader.addResource(resources.coin);
    loader.addResource(resources.star);
    loader.addResource(resources.thorn);
    loader.addResource(resources.heartFull);
    loader.addResource(resources.heartEmpty);
    loader.addResource(resources.platform);
    loader.addResource(resources.playerLeft1)
    loader.addResource(resources.playerLeft2)
    loader.addResource(resources.playerLeft3)
    loader.addResource(resources.playerLeft4)
    loader.addResource(resources.playerRight1)
    loader.addResource(resources.playerRight2)
    loader.addResource(resources.playerRight3)
    loader.addResource(resources.playerRight4)

    await game.start(loader);

    const platformHeight = 30
    const platform = new Actor({
        x: game.halfDrawWidth,
        y: game.drawHeight - 50,
        z: 1,
        width: game.drawWidth - 120,
        height: platformHeight,
        color: Color.Gray,
        collisionType: CollisionType.Fixed
    });
    platform.graphics.add(resources.platform.toSprite())
    game.add(platform);

    const playerSprites = {
        center: resources.player.toSprite(),
        left1: resources.playerLeft1.toSprite(),
        left2: resources.playerLeft2.toSprite(),
        left3: resources.playerLeft3.toSprite(),
        left4: resources.playerLeft4.toSprite(),
        right1: resources.playerRight1.toSprite(),
        right2: resources.playerRight2.toSprite(),
        right3: resources.playerRight3.toSprite(),
        right4: resources.playerRight4.toSprite(),
    };
    const player = new PlayerActor(
        game.halfDrawWidth,
        platform.pos.y,
        initialHealth,
        playerSprites
    );
    game.add(player);

    const scoreLabel = new Label({
        text: `${player.score}`,
        pos: new Vector(game.halfDrawWidth, 80),
        color: Color.Black,
        font: new Font({
            family: "HalvarBreitFont",
            size: 32,
            // @ts-ignore
            style: "bold",
            textAlign: TextAlign.Center
        }),
        z: 1000,
    });
    game.add(scoreLabel);

    const hearts: Actor[] = []
    const centerX = game.halfDrawWidth
    const healthWidth = resources.heartFull.width
    const startX = centerX - ((MAX_HEALTH * healthWidth + (MAX_HEALTH - 1) * HEALTH_SPACING) / 2);
    const y = 40;

    for (let i = 0; i < MAX_HEALTH; i++) {
        const heart = new Actor({
            x: startX + i * (healthWidth + HEALTH_SPACING) + healthWidth / 2,
            y,
            width: 48,
            height: 48
        });
        if (i < player.health) {
            heart.graphics.use(resources.heartFull.toSprite());
        } else {
            heart.graphics.use(resources.heartEmpty.toSprite());
        }
        game.add(heart);
        hearts.push(heart);
    }

    function updateHeartsDisplay() {
        for (let i = 0; i < hearts.length; i++) {
            if (i < player.health) {
                hearts[i].graphics.use(resources.heartFull.toSprite());
            } else {
                hearts[i].graphics.use(resources.heartEmpty.toSprite());
            }
        }
    }

    let totalTime = 0;
    const items: Item[] = [];
    let speed = 300;
    let timeSinceLastItem = 0;
    let timeSinceLastSpecial = 0;
    let timeSinceLastBad = 0;
    const firstSpecialOffset = 5000 + Math.random() * 2000;
    let specialStarted = false

    function spawnItem() {
        const x = 20 + Math.random() * (game.drawWidth - 20);
        const item = new Item(x, speed, 10, resources.coin.toSprite(), false, false);
        speed = Math.min(speed + 1, MAX_SPEED);
        game.add(item);
        items.push(item);
    }

    function spawnSpecialItem() {
        const x = 20 + Math.random() * (game.drawWidth - 20);
        const special = new Item(x, speed, 10, resources.star.toSprite(), true, false);
        game.add(special);
        items.push(special);
    }

    function spawnBadItem() {
        const x = 20 + Math.random() * (game.drawWidth - 20);
        const thorn = new Item(x, speed, 0, resources.thorn.toSprite(), false, true);
        game.add(thorn);
        items.push(thorn);
    }

    game.on("preupdate", (event) => {
        if (isPause()) return

        if (player.health <= 0) {
            onGameEnd({ success: false, score: player.score })
            game.stop()
            return
        } else if (player.specialStarsCount >= starsCount) {
            onGameEnd({ success: true, score: player.score })
            game.stop()
            return
        } else if (Math.abs(player.rightHandCount - player.leftHandCount) >= 5) {
            onGameEnd({ success: false, score: player.score })
            game.stop()
            return
        }

        totalTime += event.elapsed;
        timeSinceLastItem += event.elapsed;
        timeSinceLastSpecial += event.elapsed;
        timeSinceLastBad += event.elapsed;

        if (timeSinceLastItem >= 400) {
            spawnItem();
            timeSinceLastItem -= 400;
        }

        if (timeSinceLastBad >= 8000) {
            spawnBadItem();
            timeSinceLastBad -= 8000;
        }

        if (!specialStarted && totalTime >= firstSpecialOffset) {
            spawnSpecialItem();
            specialStarted = true;
            timeSinceLastSpecial = 0;
        }

        if (totalTime >= firstSpecialOffset && timeSinceLastSpecial >= 30000) {
            spawnSpecialItem();
            timeSinceLastSpecial -= 30000;
        }

        for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i];

            if (item.isKilled()) {
                items.splice(i, 1);
                continue;
            }
            const result = player.checkCatch(item)
            if (result.caught) {
                items.splice(i, 1);
                if (item.damage) {
                    player.damage();
                    updateHeartsDisplay();
                } else {
                    if (item.special) {
                        player.increaseSpecialStarsCount();
                        onSpecialItemCollect(player.specialStarsCount);
                    }
                    if (result.type === "right") player.increaseRightHandCount()
                    else player.increaseLeftHandCount()

                    player.increaseScore(item.cost);
                    scoreLabel.text = `${player.score}`;
                }
                item.kill();
            }
        }
    });
}
