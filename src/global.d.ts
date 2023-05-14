declare type Vector = {
    x: number,
    y: number,
}

declare type miliseconds = number;

declare type PressEvent = {
    onPress: boolean,
    event: (key:Key) => void
}

declare type Input = {
    name: string,
    keys: string[],
    pressed: boolean,
    justPressed: boolean,
    justReleased: boolean,
    events?:Array<PressEvent>,
}

declare type InputGroup = {
    enabled: boolean,
    inputs: Input[]
}

declare type InputGroups = {
     [name: string]: InputGroup
    }

declare type MouseButton = 'l' | 'm' | 'r';

declare type Key = string;

declare type MouseEvents = {
    startLeftClick: { vector: Vector, keys: Key[] } | false,
    startRightClick: { vector: Vector, keys: Key[] } | false,
    startMiddleClick: { vector: Vector, keys: Key[] } | false,
    startWheel: { number, keys: Key[] } | false,

    currentLeftClick: { vector: Vector, keys: Key[] } | false,
    currentRightClick: { vector: Vector, keys: Key[] } | false,
    currentMiddleClick: { vector: Vector, keys: Key[] } | false,
    currentWheel: number,

    LeftClickJustReleased: { vector: Vector, keys: Key[] } | false,
    RightClickJustReleased: { vector: Vector, keys: Key[] } | false,
    MiddleClickJustReleased: { vector: Vector, keys: Key[] } | false,

}

declare type ControllerCom = {
    movement?: Vector,
    kill?: boolean,
    sabotage?: boolean,
    use?: boolean,
    report?: boolean,
    vent?: boolean,

}

declare type vibrationIntensity = number;

declare type Axis = "leftX" | "leftY" | "rightX" | "rightY";

declare type Triggers =  "leftTrigger" | "rightTrigger";

declare enum PSButtons {
    Cross= 0,
    Circle,
    Square,
    Triangle,
    L1,
    R1,
    L2,
    R2,
    Share,
    Options,
    L3,
    R3,
    DPadUp,
    DPadDown,
    DPadLeft,
    DPadRight,
    PS,
    TouchPad
}

declare enum XboxButtons {
    A = 0,
    B,
    X,
    Y,
    LB,
    RB,
    LT,
    RT,
    Back,
    Start,
    L3,
    R3,
    DPadUp,
    DPadDown,
    DPadLeft,
    DPadRight,
    Xbox
}



