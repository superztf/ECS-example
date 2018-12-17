import { Component } from "lipstick-ecs";

export class CircleInfo extends Component {
    public color: string;
    public radius: number;

    constructor(c: string, r: number) {
        super();
        this.color = c;
        this.radius = r;
    }
}
