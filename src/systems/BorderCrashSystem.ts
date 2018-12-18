import { System } from "lipstick-ecs";
import { CanvasContext } from "../components/CanvasContext";
import { CircleInfo } from "../components/CircleInfo";
import { Movement } from "../components/Movement";
import { Position } from "../components/Position";

export class BorderCrashSystem extends System {
    public Update(t: number) {
        const canvas = this.admin.GetPubComponent(CanvasContext);
        if (!canvas) {
            return;
        }
        const width = canvas.ctx.canvas.width;
        const height = canvas.ctx.canvas.height;
        for (const p of this.admin.GetComponentsByTuple(Position, Movement, CircleInfo)) {
            const m = p.SureSibling(this.admin, Movement);
            const c = p.SureSibling(this.admin, CircleInfo);
            if (p.y + c.radius >= height && m.vy > 0) {
                m.vy *= -1;
            }
            if ((p.x < c.radius && m.vx < 0) || (p.x + c.radius >= width && m.vx > 0)) {
                m.vx *= -1;
            }
        }
    }
}
