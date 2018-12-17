import { System } from "lipstick-ecs";
import { Movement } from "../components/Movement";
import { Position } from "../components/Position";

export class MoveSystem extends System {
    public Update(t: number) {
        for (const m of this.admin.GetComponents(Movement)) {
            const p = m.GetSibling(this.admin, Position);
            if (p) {
                p.x += m.vx * t / 1000;
                m.vy += 0.05;
                p.y += m.vy * t / 1000;
            }
        }
    }
}