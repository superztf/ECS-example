import { Component } from "lipstick-ecs";

export class Position extends Component {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
}
