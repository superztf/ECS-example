import { Component } from "lipstick-ecs";

export class FrameCount extends Component {
    public count = 0;
    public spent = 0;
    public lastfps = 0;
}
