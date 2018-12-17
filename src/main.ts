import { EntityAdmin } from "lipstick-ecs";
import { CanvasContext } from "./components.ts/CanvasContext";

function main() {
    const admin = new EntityAdmin();
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    if (!context) {
        document.write("canvas.getContext('2d') err!")
        return;
    }
    admin.SetPubComponent(new CanvasContext(context));

}
