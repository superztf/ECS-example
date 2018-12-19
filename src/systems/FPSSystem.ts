import { System } from "lipstick-ecs";
import { CanvasContext } from "../components/CanvasContext";
import { FrameCount } from "../components/FrameCount";

export class FPSSystem extends System {
    public Update(t: number) {

        const fc = this.admin.GetPubComponent(FrameCount);
        const canvas = this.admin.GetPubComponent(CanvasContext);
        if (fc && canvas) {
            if (t <= 0) {
                this.DrawText(canvas.ctx, t);
                return;
            }
            const real_fps = 1000 / t;

            ++fc.count;
            fc.timespent += t;
            if (fc.timespent >= 1000) {
                fc.lastfps = fc.timespent / fc.count;
                fc.count = 0;
                fc.timespent = 0;
            }
            let realrate = 1;
            if (fc.lastfps) {
                realrate = 1 - 0.618;
            }
            const fps = Math.round(real_fps * realrate + fc.lastfps * (1 - realrate));
            this.DrawText(canvas.ctx, fps);
        }
    }

    private DrawText(ctx: CanvasRenderingContext2D, fps: number) {
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#fff";
        ctx.font = "10px Arial";
        ctx.fillText(`FPS:${fps}`, 6, 10);
    }
}
