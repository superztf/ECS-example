import { Component } from "lipstick-ecs";

export class Movement extends Component {
    public vx: number;
    public vy: number;

    constructor(vx?: number, vy?: number) {
        super();
        this.vx = vx ? vx : 0;
        this.vy = vy ? vy : 0;
    }
}
