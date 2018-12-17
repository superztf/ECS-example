import { System } from "lipstick-ecs";
import { CanvasContext } from "../components.ts/CanvasContext";
import { CircleInfo } from "../components.ts/CircleInfo";
import { Position } from "../components.ts/Position";
class DrawSystem extends System {
    public Update(timeDelta: number) {
        const canvas = this.admin.GetPubComponent(CanvasContext);
    }

    private get canvas(): CanvasContext {
        const c = this.admin.GetPubComponent(CanvasContext);
        if (c) {
            return c;
        } else {
            throw (new Error("get CanvasContext fail"));
        }
    }

    private drawcircle(ctx: CanvasRenderingContext2D, c: CircleInfo, p: Position) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, c.radius, 0, 2 * Math.PI);
        ctx.fillStyle = c.color;
        ctx.fill();
        ctx.closePath();
    }
}
// window.onload=function(){
//     var canvas=document.getElementById('canvas');
//     canvas.height=728;
//     canvas.width=1024;
//     var context=canvas.getContext('2d');
//     context.fillStyle='red';
//     context.beginPath();
//     context.arc(800,300,30,0,2*Math.PI,true);
//     context.closePath();
//     context.fill();
//     setInterval(function(){
//         run(context);
//     }, 50);
// };
// var speed=0;
// var startPoint=800;
// function run(cxt){
//     speed=-7;
//     cxt.clearRect(0,0,1024,728);
//     //cxt.top+=speed;    
//     startPoint+=speed;
//     cxt.beginPath();
//     cxt.arc(startPoint,300,30,0,2*Math.PI,true);
//     cxt.closePath();
//     cxt.fill();
// }