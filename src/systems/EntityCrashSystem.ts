import { System } from "lipstick-ecs";
import { Position } from "../components/Position";

export class EntityCrashSystem extends System {
    public Update(t: number) {
        for (let p of this.admin.GetComponents(Position)) {

        }
    }
}