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

            fc.count += 1;
            fc.spent += t;
            if (fc.spent >= 1000) {
                fc.lastfps = fc.count / fc.spent * 1000;
                fc.count = 0;
                fc.spent = 0;
            }
            let realrate = 1;
            if (fc.lastfps) {
                realrate = 0.618;
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
