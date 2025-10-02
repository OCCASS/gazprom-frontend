import { Actor, Engine, ImageSource, Color, DisplayMode, CollisionType, Label, Font, Vector, TextAlign } from "excalibur";
import { CustomLoader } from "./custom-loader";
import { PlayerActor } from "./player";
import { Item } from "./item";
import { GameResult } from "./types";
import { MAX_HEALTH } from "./constants";

const HEALTH_SPACING = 5;
const MAX_SPEED = 500;
const ITEM_SPAWN_INTERVAL = 400;
const BAD_ITEM_SPAWN_INTERVAL = 8000;
const SPECIAL_ITEM_SPAWN_INTERVAL = 30000;
const SPECIAL_ITEM_FIRST_DELAY = 5000;
const SPECIAL_ITEM_FIRST_VARIANCE = 2000;
const MAX_HANDS_COUNTS_DIFF = 5;
const PLATFORM_HEIGHT = 30;
const PLATFORM_OFFSET_Y = 50;
const SPEED_INCREMENT = 1;
const ITEM_PRICE = 5
const SPECIAL_ITEM_PRICE = 20

interface Resources {
    player: ImageSource;
    coin: ImageSource;
    star: ImageSource;
    thorn: ImageSource;
    heartFull: ImageSource;
    heartEmpty: ImageSource;
    platform: ImageSource;
    playerLeft1: ImageSource;
    playerLeft2: ImageSource;
    playerLeft3: ImageSource;
    playerLeft4: ImageSource;
    playerRight1: ImageSource;
    playerRight2: ImageSource;
    playerRight3: ImageSource;
    playerRight4: ImageSource;
}

interface PlayerSprites {
    center: any;
    left1: any;
    left2: any;
    left3: any;
    left4: any;
    right1: any;
    right2: any;
    right3: any;
    right4: any;
}

class GameState {
    totalTime = 0;
    items: Item[] = [];
    speed = 300;
    timeSinceLastItem = 0;
    timeSinceLastSpecial = 0;
    timeSinceLastBad = 0;
    specialStarted = false;
    firstSpecialOffset: number;

    constructor() {
        this.firstSpecialOffset = SPECIAL_ITEM_FIRST_DELAY + Math.random() * SPECIAL_ITEM_FIRST_VARIANCE;
    }

    update(elapsed: number) {
        this.totalTime += elapsed;
        this.timeSinceLastItem += elapsed;
        this.timeSinceLastSpecial += elapsed;
        this.timeSinceLastBad += elapsed;
    }

    shouldSpawnItem(): boolean {
        if (this.timeSinceLastItem >= ITEM_SPAWN_INTERVAL) {
            this.timeSinceLastItem -= ITEM_SPAWN_INTERVAL;
            return true;
        }
        return false;
    }

    shouldSpawnBadItem(): boolean {
        if (this.timeSinceLastBad >= BAD_ITEM_SPAWN_INTERVAL) {
            this.timeSinceLastBad -= BAD_ITEM_SPAWN_INTERVAL;
            return true;
        }
        return false;
    }

    shouldSpawnSpecialItem(): boolean {
        if (!this.specialStarted && this.totalTime >= this.firstSpecialOffset) {
            this.specialStarted = true;
            this.timeSinceLastSpecial = 0;
            return true;
        }

        if (this.totalTime >= this.firstSpecialOffset &&
            this.timeSinceLastSpecial >= SPECIAL_ITEM_SPAWN_INTERVAL) {
            this.timeSinceLastSpecial -= SPECIAL_ITEM_SPAWN_INTERVAL;
            return true;
        }

        return false;
    }

    incrementSpeed() {
        this.speed = Math.min(this.speed + SPEED_INCREMENT, MAX_SPEED);
    }

    addItem(item: Item) {
        this.items.push(item);
    }

    removeItem(index: number) {
        this.items.splice(index, 1);
    }
}

export function initialize(canvasElement: HTMLCanvasElement): Engine {
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

function loadResources(): Resources {
    return {
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
}

async function loadResourcesWithLoader(game: Engine, resources: Resources): Promise<void> {
    const loader = new CustomLoader();

    Object.values(resources).forEach(resource => {
        loader.addResource(resource);
    });

    await game.start(loader);
}

function createPlatform(game: Engine, resources: Resources): Actor {
    const platform = new Actor({
        x: game.halfDrawWidth,
        y: game.drawHeight - PLATFORM_OFFSET_Y,
        z: 1,
        width: game.drawWidth - 120,
        height: PLATFORM_HEIGHT,
        color: Color.Gray,
        collisionType: CollisionType.Fixed
    });

    platform.graphics.add(resources.platform.toSprite());
    game.add(platform);

    return platform;
}

function createPlayerSprites(resources: Resources): PlayerSprites {
    return {
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
}

function createScoreLabel(game: Engine, initialScore: number): Label {
    return new Label({
        text: `${initialScore}`,
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
}

function createHealthDisplay(game: Engine, resources: Resources, initialHealth: number): Actor[] {
    const hearts: Actor[] = [];
    const centerX = game.halfDrawWidth;
    const healthWidth = resources.heartFull.width;
    const startX = centerX - ((MAX_HEALTH * healthWidth + (MAX_HEALTH - 1) * HEALTH_SPACING) / 2);
    const y = 40;

    for (let i = 0; i < MAX_HEALTH; i++) {
        const heart = new Actor({
            x: startX + i * (healthWidth + HEALTH_SPACING) + healthWidth / 2,
            y,
            width: 48,
            height: 48,
            z: 1000
        });

        heart.graphics.use(
            i < initialHealth ? resources.heartFull.toSprite() : resources.heartEmpty.toSprite()
        );

        game.add(heart);
        hearts.push(heart);
    }

    return hearts;
}

function updateHealthDisplay(hearts: Actor[], resources: Resources, currentHealth: number) {
    hearts.forEach((heart, i) => {
        heart.graphics.use(
            i < currentHealth ? resources.heartFull.toSprite() : resources.heartEmpty.toSprite()
        );
    });
}

function spawnRegularItem(game: Engine, gameState: GameState, resources: Resources) {
    const x = Math.random() * game.drawWidth;
    const item = new Item(x, gameState.speed, ITEM_PRICE, resources.coin.toSprite(), false, false);
    gameState.incrementSpeed();
    game.add(item);
    gameState.addItem(item);
}

function spawnSpecialItem(game: Engine, gameState: GameState, resources: Resources) {
    const x = Math.random() * game.drawWidth;
    const item = new Item(x, gameState.speed, SPECIAL_ITEM_PRICE, resources.star.toSprite(), true, false);
    game.add(item);
    gameState.addItem(item);
}

function spawnBadItem(game: Engine, gameState: GameState, resources: Resources) {
    const x = Math.random() * game.drawWidth;
    const item = new Item(x, gameState.speed, 0, resources.thorn.toSprite(), false, true);
    game.add(item);
    gameState.addItem(item);
}

function checkGameEndConditions(
    player: PlayerActor,
    starsCount: number,
    onGameEnd: (result: GameResult) => void,
    game: Engine
): boolean {
    const shouldEnd =
        player.health <= 0 ||
        player.specialStarsCount >= starsCount

    if (shouldEnd) {
        const finalScore = player.score;
        const success = player.specialStarsCount >= starsCount;

        console.log("🎮 GAME ENDING!");
        console.log("   Health:", player.health);
        console.log("   Stars:", player.specialStarsCount, "/", starsCount);
        console.log("   Hands diff:", Math.abs(player.rightHandCount - player.leftHandCount));
        console.log("   Final Score:", finalScore);
        console.log("   Success:", success);

        game.stop();
        onGameEnd({ success, score: finalScore });

        return true;
    }

    return false;
}

function processHandsCount(player: PlayerActor, resources: Resources, hearts: Actor[]) {
    if (Math.abs(player.rightHandCount - player.leftHandCount) >= MAX_HANDS_COUNTS_DIFF) {
        player.damage()
        player.resetHandCount()
        updateHealthDisplay(hearts, resources, player.health);
    }

}

function processItems(
    gameState: GameState,
    player: PlayerActor,
    resources: Resources,
    scoreLabel: Label,
    hearts: Actor[],
    onSpecialItemCollect: (number: number) => void
) {
    for (let i = gameState.items.length - 1; i >= 0; i--) {
        const item = gameState.items[i];

        if (item.isKilled() || item.isCollected()) {
            gameState.removeItem(i);
            continue;
        }

        const result = player.checkCatch(item);
        if (result.caught) {
            item.markAsCollected();
            gameState.removeItem(i);
            item.kill();

            if (item.damage) {
                player.damage();
                updateHealthDisplay(hearts, resources, player.health);
                console.log("💔 Damage taken! Health:", player.health, "Score:", player.score);
            } else {
                const scoreBefore = player.score;

                if (item.special) {
                    player.increaseSpecialStarsCount();
                    onSpecialItemCollect(player.specialStarsCount);
                } else {
                    if (result.type === "right") player.increaseRightHandCount();
                    else player.increaseLeftHandCount();
                }

                player.increaseScore(item.cost);
                scoreLabel.text = `${player.score}`;

                console.log("✨ Item collected! Score:", scoreBefore, "→", player.score,
                    "| Type:", item.special ? "STAR" : "COIN", "| Item ID:", item.id);
            }
        }
    }
}

export async function start(
    game: Engine,
    initialHealth: number,
    starsCount: number,
    onGameEnd: (result: GameResult) => void,
    onSpecialItemCollect: (number: number) => void,
    isPause: () => boolean
): Promise<void> {
    const resources = loadResources();
    await loadResourcesWithLoader(game, resources);

    const platform = createPlatform(game, resources);
    const playerSprites = createPlayerSprites(resources);
    const player = new PlayerActor(
        game.halfDrawWidth,
        platform.pos.y,
        initialHealth,
        playerSprites
    );
    game.add(player);

    const scoreLabel = createScoreLabel(game, player.score);
    game.add(scoreLabel);

    const hearts = createHealthDisplay(game, resources, player.health);
    const gameState = new GameState();

    game.on("preupdate", (event) => {
        if (isPause()) return;

        gameState.update(event.elapsed);

        if (gameState.shouldSpawnItem()) {
            spawnRegularItem(game, gameState, resources);
        }

        if (gameState.shouldSpawnBadItem()) {
            spawnBadItem(game, gameState, resources);
        }

        if (gameState.shouldSpawnSpecialItem()) {
            spawnSpecialItem(game, gameState, resources);
        }

        processItems(gameState, player, resources, scoreLabel, hearts, onSpecialItemCollect);
        processHandsCount(player, resources, hearts)

        if (checkGameEndConditions(player, starsCount, onGameEnd, game)) {
            return;
        }
    });
}
