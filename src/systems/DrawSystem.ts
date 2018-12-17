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
            for (let p of this.admin.GetComponentsByTuple(Position, CircleInfo)) {
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