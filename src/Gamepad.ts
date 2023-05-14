

export class GamepadMgr {
    private gamepads: Gamepad[] = [];
    private isFirefox: boolean = false;

    /**
     * @description gamepad manager
     */
    constructor() {

        //get gamepads
        //this.gamepads = navigator.getGamepads() as Gamepad[] || [];
        this.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

        window.addEventListener("gamepadconnected", (e: GamepadEvent) => {
            console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
                e.gamepad.index, e.gamepad.id,
                e.gamepad.buttons.length, e.gamepad.axes.length);
            this.gamepads.push(e.gamepad);
        });

        window.addEventListener("gamepaddisconnected", (e: GamepadEvent) => {
            console.log("Gamepad disconnected from index %d: %s",
                e.gamepad.index, e.gamepad.id);
            this.gamepads.splice(this.gamepads.indexOf(e.gamepad), 1);
        });


    }

    /**
     * 
     * @returns 
     * @description get all gamepads
     */
    public getGamepads(): Gamepad[] {
        return this.gamepads;
    }

    /**
     * 
     * @param index 
     * @returns 
     * @description get gamepad by index
     */
    public getGamepad(index: number): Gamepad | undefined {
        return this.gamepads[index];
    }

    /**
     * 
     * @param index 
     * @returns 
     * @description get gamepad buttons by index
     */
    public getGamepadButtons(index: number) {
        return this.gamepads[index]?.buttons;
        
    }

    /**
     * 
     * @param index 
     * @returns 
     */
    public getGamepadAxes(index: number) {
        return this.gamepads[index]?.axes;
    }

    /**
     * 
     * @param index 
     * @param button 
     * @returns 
     * @description get gamepad button by index and button
     * @example
     * gamepadMgr.getGamepadButton(0, XboxButtons.LB);
     */
    public getGamepadButton(index: number, button: number) {
        return this.gamepads[index]?.buttons[button];
    }

    /**
     * 
     * @param index 
     * @param axis 
     * @returns 
     * @description get gamepad axis by index and axis
     * @example
     * gamepadMgr.getGamepadAxis(0, Axis.leftX);
     */
    public getGamepadAxis(index: number, axis: number) {
        return this.gamepads[index]?.axes[axis];
    }

    
    /**
     * 
     * @param index 
     * @param duration 
     * @param strongMagnitude
     * @param weakMagnitude
     * @returns 
     * @description vibrate gamepad
     * @todo test on firefox and other browsers
     */
    public vibrate(index: number, duration: number, strongMagnitude:number, weakMagnitude:number = strongMagnitude): boolean {

        if (!this.gamepads[index]) return false;

        //if brower is firefox
        if (this.isFirefox) {
            //@ts-ignore
            if (!this.gamepads[index]?.hapticActuators[0]) return false;

            //@ts-ignore
            this.gamepads[index]?.hapticActuators[0].pulse(strongMagnitude, duration);
            return true;
        }

        //if gamepad is not supporting haptic feedback
        //@ts-ignore
        if (!this.gamepads[index]?.vibrationActuator) return false;

        //other browsers
        //@ts-ignore
        this.gamepads[index]?.vibrationActuator.playEffect("dual-rumble", {
            startDelay: 0,
            duration: duration,
            weakMagnitude: weakMagnitude,
            strongMagnitude: strongMagnitude
        });


        return true;
    }

    /**
     * 
     * @param value 
     * @param duration 
     * @description vibrate all gamepads
     */
    public vibrateAllPads(value: number, duration: number) {
        this.gamepads.forEach((pad: Gamepad) => {
            this.vibrate(pad.index, value, duration);
        });
    }




}