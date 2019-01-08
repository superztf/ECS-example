import { EntityAdmin, System } from "lipstick-ecs";
import { Movement } from "../components/Movement";
import { Position } from "../components/Position";

export class MoveSystem extends System {
    public static Update(admin: EntityAdmin, t: number) {
        for (const m of admin.GetComponents(Movement)) {
            const p = m.GetSibling(Position);
            if (p) {
                p.x += m.vx * t / 1000;
                m.vy += 1;
                p.y += m.vy * t / 1000;
            }
        }
    }
}
