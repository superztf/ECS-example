import { System } from "lipstick-ecs";
import { CircleInfo } from "../components/CircleInfo";
import { Movement } from "../components/Movement";
import { Position } from "../components/Position";

export class EntityCrashSystem extends System {
    public Update(t: number) {
        for (const p1 of this.admin.GetComponents(Position)) {
            for (const p2 of this.admin.GetComponents(Position)) {
                if (p1.entity === p2.entity) {
                    continue;
                }
                const c1 = p1.SureSibling(this.admin, CircleInfo);
                const c2 = p2.SureSibling(this.admin, CircleInfo);
                const m1 = p1.SureSibling(this.admin, Movement);
                const m2 = p2.SureSibling(this.admin, Movement);
                const distance = (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
                if (distance < (c1.radius + c2.radius) ** 2) {
                    const preview_dis = (p1.x + m1.vx * t / 1000 - p2.x - m2.vx * t / 1000) ** 2 + (p1.y + m1.vy * t / 1000 - p2.y - m2.vy * t / 1000) ** 2;
                    if (preview_dis < distance) {
                        this.EntityCrash(m1, m2, c1, c2, p1, p2);
                    }
                }
            }
        }
    }

    private EntityCrash(mv1: Movement, mv2: Movement, r1: CircleInfo, r2: CircleInfo, p1: Position, p2: Position) {
        const ma = r1.radius * r1.radius;
        const mb = r2.radius * r2.radius;

        const sx = p1.x - p2.x;
        const sy = p1.y - p2.y;
        const hypotenuse = Math.sqrt(sx * sx + sy * sy);
        const s1x = sx / hypotenuse;
        const s1y = sy / hypotenuse;
        const t1x = -s1y;
        const t1y = s1x;

        const vas = mv1.vx * s1x + mv1.vy * s1y;
        const vat = mv1.vx * t1x + mv1.vy * t1y;
        const vbs = mv2.vx * s1x + mv2.vy * s1y;
        const vbt = mv2.vx * t1x + mv2.vy * t1y;

        const vasf = (2 * mb * vbs + vas * (ma - mb)) / (ma + mb);
        const vbsf = (2 * ma * vas - vbs * (ma - mb)) / (ma + mb);

        let nsx = vasf * s1x;
        let nsy = vasf * s1y;
        let ntx = vat * t1x;
        let nty = vat * t1y;

        mv1.vx = nsx + ntx;
        mv1.vy = nsy + nty;

        nsx = vbsf * s1x;
        nsy = vbsf * s1y;
        ntx = vbt * t1x;
        nty = vbt * t1y;

        mv2.vx = nsx + ntx;
        mv2.vy = nsy + nty;
    }
}
