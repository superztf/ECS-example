import { System } from "lipstick-ecs";
import { CanvasContext } from "../components/CanvasContext";
import { CircleInfo } from "../components/CircleInfo";
import { Position } from "../components/Position";

export class DrawSystem extends System {

    public Update(t: number) {
        const canvas = this.admin.GetPubComponent(CanvasContext);
        if (canvas) {
            const w = canvas.ctx.canvas.width;
            const h = canvas.ctx.canvas.height;
            canvas.ctx.clearRect(0, 0, w, h);
            for (const p of this.admin.GetComponentsByTuple(Position, CircleInfo)) {
                const c = p.GetSibling(this.admin, CircleInfo) as CircleInfo; // GetSiblingForce
                canvas.ctx.beginPath();
                canvas.ctx.arc(p.x, p.y, c.radius, 0, 2 * Math.PI);
                canvas.ctx.fillStyle = c.color;
                canvas.ctx.fill();
                canvas.ctx.closePath();
            }
        }
    }
}
