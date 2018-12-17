import { Component } from "lipstick-ecs";

export class CanvasContext extends Component {
    private _ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        super();
        this._ctx = ctx;
    }

    get ctx() {
        return this._ctx;
    }
}
