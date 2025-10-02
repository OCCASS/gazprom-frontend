import { DefaultLoader, Engine } from "excalibur";

export class CustomLoader extends DefaultLoader {
    private startTime: number = 0;
    private userInteracted: boolean = false;
    private resolveUserAction?: () => void;
    private animationProgress: number = 0;

    override onUpdate(engine: Engine, elapsedMilliseconds: number): void {
        this.animationProgress += elapsedMilliseconds / 1000;
        this.engine = engine
    }

    override onDraw(ctx: CanvasRenderingContext2D) {
        const width = this.engine.drawWidth;
        const height = this.engine.drawHeight;
        const progress = this.progress;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        const barWidth = 400;
        const barHeight = 30;
        const barX = (width - barWidth) / 2;
        const barY = height / 2;

        ctx.fillStyle = "#6088e4";
        ctx.fillRect(barX - 2, barY - 2, barWidth + 4, barHeight + 4);
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#bdcefa";
        ctx.fillRect(barX, barY, barWidth * progress, barHeight);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#1919ef";
        ctx.font = "bold 20px Arial, sans-serif";
        ctx.fillText(`${Math.round(progress * 100)}%`, width / 2, barY + barHeight + 40);

        if (progress >= 1 && !this.userInteracted) {
            const pulseAlpha = 1 + Math.sin(this.animationProgress * 3) * 0.3;
            ctx.globalAlpha = pulseAlpha;
            ctx.textAlign = "center";
            ctx.fillStyle = "#1919ef";
            ctx.font = "bold 24px Arial, sans-serif";
            ctx.fillText("Начать игру", width / 2, height / 2 + 150);
        }

        ctx.restore();
    }

    override async onUserAction(): Promise<void> {
        return new Promise((resolve) => {
            this.resolveUserAction = () => {
                this.userInteracted = true;
                resolve();
            };

            const handleClick = () => {
                if (this.resolveUserAction) {
                    this.resolveUserAction();
                }
                document.removeEventListener("click", handleClick);
                document.removeEventListener("touchstart", handleClick);
            };

            document.addEventListener("click", handleClick);
            document.addEventListener("touchstart", handleClick);
        });
    }

    override async onBeforeLoad(): Promise<void> {
        this.startTime = Date.now();
        console.log("🎮 Starting to load game assets...");
    }

    override async onAfterLoad(): Promise<void> {
        const loadTime = Date.now() - this.startTime;
        console.log(`✅ All assets loaded in ${loadTime}ms`);

        await new Promise(resolve => setTimeout(resolve, 500));
    }
}
