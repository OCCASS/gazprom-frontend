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

        // Clear canvas with dark background
        ctx.fillStyle = '#0a0e27';
        ctx.fillRect(0, 0, width, height);

        // Animated background particles
        this.drawParticles(ctx, width, height);

        // Game title
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 48px Arial, sans-serif';
        ctx.fillText('LOADING GAME', width / 2, height / 2 - 100);

        // Progress bar background
        const barWidth = 400;
        const barHeight = 30;
        const barX = (width - barWidth) / 2;
        const barY = height / 2;

        // Outer glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#4a90e2';
        ctx.fillStyle = '#1a1e35';
        ctx.fillRect(barX - 2, barY - 2, barWidth + 4, barHeight + 4);
        ctx.shadowBlur = 0;

        // Progress bar fill with gradient
        const gradient = ctx.createLinearGradient(barX, barY, barX + barWidth, barY);
        gradient.addColorStop(0, '#4a90e2');
        gradient.addColorStop(0.5, '#5ba3f5');
        gradient.addColorStop(1, '#6bb6ff');

        ctx.fillStyle = gradient;
        ctx.fillRect(barX, barY, barWidth * progress, barHeight);

        // Progress percentage
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px Arial, sans-serif';
        ctx.fillText(`${Math.round(progress * 100)}%`, width / 2, barY + barHeight + 40);

        // Loading dots animation
        const dots = '.'.repeat((Math.floor(this.animationProgress * 2) % 4));
        ctx.textAlign = 'center';
        ctx.fillStyle = '#8a9bb3';
        ctx.font = '18px Arial, sans-serif';
        ctx.fillText(`Loading assets${dots}`, width / 2, barY + barHeight + 80);

        // Show "Click to start" when loading is complete
        if (progress >= 1 && !this.userInteracted) {
            const pulseAlpha = 0.5 + Math.sin(this.animationProgress * 3) * 0.3;
            ctx.globalAlpha = pulseAlpha;
            ctx.textAlign = 'center';
            ctx.fillStyle = '#4a90e2';
            ctx.font = 'bold 24px Arial, sans-serif';
            ctx.fillText('CLICK TO START', width / 2, height / 2 + 150);
        }

        ctx.restore();
    }

    private drawParticles(ctx: CanvasRenderingContext2D, width: number, height: number) {
        for (let i = 0; i < 20; i++) {
            const x = ((i * 137.5 + this.animationProgress * 20) % width);
            const y = ((i * 73.3 + this.animationProgress * 15) % height);
            const size = 2 + (i % 3);
            const alpha = 0.2 + Math.sin(this.animationProgress + i) * 0.2;

            ctx.globalAlpha = alpha;
            ctx.fillStyle = '#4a90e2';
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
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
                document.removeEventListener('click', handleClick);
                document.removeEventListener('touchstart', handleClick);
            };

            document.addEventListener('click', handleClick);
            document.addEventListener('touchstart', handleClick);
        });
    }

    override async onBeforeLoad(): Promise<void> {
        this.startTime = Date.now();
        console.log('🎮 Starting to load game assets...');
    }

    override async onAfterLoad(): Promise<void> {
        const loadTime = Date.now() - this.startTime;
        console.log(`✅ All assets loaded in ${loadTime}ms`);

        await new Promise(resolve => setTimeout(resolve, 500));
    }
}
