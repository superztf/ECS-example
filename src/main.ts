import { EntityAdmin } from "lipstick-ecs";
import { CanvasContext } from "./components/CanvasContext";
import { CircleInfo } from "./components/CircleInfo";
import { FrameCount } from "./components/FrameCount";
import { Movement } from "./components/Movement";
import { Position } from "./components/Position";
import { BorderCrashSystem } from "./systems/BorderCrashSystem";
import { DrawSystem } from "./systems/DrawSystem";
import { EntityCrashSystem } from "./systems/EntityCrashSystem";
import { FPSSystem } from "./systems/FPSSystem";
import { MoveSystem } from "./systems/MoveSystem";
import { IsCircleCrash } from "./utils";

const NUM = 25;

function main() {
    const admin = new EntityAdmin();
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.height = 800;
    canvas.width = 1280;
    const context = canvas.getContext("2d");
    if (!context) {
        document.write("canvas.getContext('2d') err!");
        return;
    }
    admin.SetPubComponent(new CanvasContext(context));
    admin.SetPubComponent(new FrameCount());
    admin.AddSystem(BorderCrashSystem, 2);
    admin.AddSystem(DrawSystem, 4);
    admin.AddSystem(EntityCrashSystem, 1);
    admin.AddSystem(MoveSystem, 3);
    admin.AddSystem(FPSSystem);

    for (let i = 0; i < NUM; i++) {
        const r = generateColor();
        const g = generateColor();
        const b = generateColor();
        const radius = Math.floor(Math.random() * 40) + 15;
        const color = `rgb(${r},${g},${b})`;
        const pos = generatePos(canvas.width, canvas.height, radius);
        const c = new CircleInfo(color, radius);
        const m = new Movement();
        const p = new Position(pos.x, pos.y);
        admin.CreateEntity(c, m, p);
    }
    admin.start();
    admin.UpdateSystems();
    (function drawFrame() {
        window.requestAnimationFrame(drawFrame);
        admin.UpdateSystems();
    })();
}

const goodxy: Array<{ x: number, y: number, r: number }> = [];

function generatePos(w: number, h: number, radius: number): { x: number, y: number } {
    h /= 3;
    let x = Math.floor(Math.random() * (w - radius * 2)) + radius;
    let y = Math.floor(Math.random() * (h - radius));
    while (true) {
        let ok = true;
        for (const pos of goodxy) {
            if (IsCircleCrash(x, y, radius, pos.x, pos.y, pos.r)) { ok = false; }
        }
        if (ok) {
            break;
        } else {
            x = Math.floor(Math.random() * (w - radius * 2)) + radius;
            y = Math.floor(Math.random() * (h - radius));
        }
    }
    goodxy.push({ x, y, r: radius });
    return { x, y };
}

function generateColor(): number {
    return Math.floor(Math.random() * 216) + 40;
}

window.onload = main;
