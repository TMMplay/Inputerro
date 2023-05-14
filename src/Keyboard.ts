export class KeyboardMgr {
    private preventDefault: boolean;
    //private inputs: Input[] = [];
    private inputGroups: InputGroups = {};
    private keyboardKeys: Array<{ key: string, justPressed: boolean, pressed: boolean, justReleased: boolean, events: PressEvent[] }> = [];

    /**
     * 
     * @returns 
     *@description returns input groups
     */
    public getInputGroups(): InputGroups {
        return this.inputGroups;
    }

    /**
     * 
     * @param inputGroupName 
     * @param enable 
     * @returns 
     * @description enables or disables input group
     */
    public enableInputGroup(inputGroupName: string, enable: boolean): boolean {
        if (!this.inputGroups[inputGroupName]) return false;
        this.inputGroups[inputGroupName].enabled = enable;
        return true;
    }

    /**
     * 
     * @param enable 
     * @description enables or disables all input groups
     */
    public enableAllInputGroups(enable: boolean): void {
        for (const inputGroupName in this.inputGroups) {
            this.inputGroups[inputGroupName].enabled = enable;
        }
    }

    /**
     * @description disables all input groups
     */
    public disableAllInputGroups(): void {
        for (const inputGroupName in this.inputGroups) {
            this.inputGroups[inputGroupName].enabled = false;
        }
    }

    /**
     * 
     * @param inputGroupName 
     * @returns 
     * @description enables only given input group
     */
    public enableOnlyInputGroup(inputGroupName: string): boolean {
        for (const inputGroupName in this.inputGroups) {
            this.inputGroups[inputGroupName].enabled = false;
        }
        if (!this.inputGroups[inputGroupName]) return false;
        this.inputGroups[inputGroupName].enabled = true;
        return true;
    }

    /**
     * 
     * @param inputGroupName 
     * @param mapping 
     * @description updates input group mapping (removes all inputs and adds new ones)
     */
    public updateMapping(inputGroupName: string, mapping: Array<{ name: string, keys: string[] }>): void {
        this.inputGroups[inputGroupName] = { enabled: true, inputs: [] };
        for (const input of mapping) {
            this.registerInput(inputGroupName, input.name, input.keys);
        }
    }

    /**
     * 
     * @param inputGroupName 
     * @param name 
     * @returns 
     * @description return if input group key is pressed (returns false if input group is disabled)
     */
    public isKeyPressed(inputGroupName: string, name: string): boolean {
        if (!this.inputGroups[inputGroupName] || !this.inputGroups[inputGroupName].enabled) return false;
        return this.inputGroups[inputGroupName].inputs.find(input => input.name === name)?.pressed || false;
    }


    /**
     * 
     * @param key 
     * @returns 
     * @description return if keyboard key is pressed
     */

    public isKeyboardKeyPressed(key: Key) {
        return this.keyboardKeys.find(keyboardKey => keyboardKey.key === key)?.pressed || false;
    }

    /**
     * 
     * @param key 
     * @returns 
     * @description return if keyboard key is just pressed
     */

    public isKeyboardKeyJustPressed(key: Key) {
        return this.keyboardKeys.find(keyboardKey => keyboardKey.key === key)?.justPressed || false;
    }

    /**
     * 
     * @param key 
     * @returns 
     * @description return if keyboard key is just released
     */

    public isKeyboardKeyJustReleased(key: Key) {
        return this.keyboardKeys.find(keyboardKey => keyboardKey.key === key)?.justReleased || false;
    }

    /**
   * 
   * @returns 
   * @description return if keyboard key is just pressed
   */
    public isAnyKeyboardKeyJustPressed() {
        return this.keyboardKeys.some(keyboardKey => keyboardKey.justPressed);
    }

    /**
     * 
     * @returns 
     * @description return if keyboard key is just released
     */
    public isAnyKeyboardKeyJustReleased() {
        return this.keyboardKeys.some(keyboardKey => keyboardKey.justReleased);
    }

    /**
     * 
     * @returns 
     * @description return if any keyboard key is pressed
     */
    public isAnyKeyboardKeyPressed() {
        return this.keyboardKeys.some(keyboardKey => keyboardKey.pressed);
    }

    /**
     * 
     * @returns 
     * @description return pressed keyboard keys
     */

    public getKeyboardPressedKeys() {
        return this.keyboardKeys.filter(keyboardKey => keyboardKey.pressed).map(keyboardKey => keyboardKey.key);
    }


/**
 * 
 * @param inputGroupName 
 * @param name 
 * @returns 
 * @description return if input group key is just pressed (returns false if input group is disabled)
 */
    public isKeyJustPressed(inputGroupName: string, name: string): boolean {
        if (!this.inputGroups[inputGroupName] || !this.inputGroups[inputGroupName].enabled) return false;
        return this.inputGroups[inputGroupName].inputs.find(input => input.name === name)?.justPressed || false;
    }

    /**
     * 
     * @param inputGroupName 
     * @param name 
     * @param keys 
     * @param events 
     * @returns 
     * @description registers input to input group
     */
    public registerInput(inputGroupName: string, name: string, keys: string | string[], events?: PressEvent[] | PressEvent): boolean {
        //check if event 

        if (!this.inputGroups[inputGroupName]) this.inputGroups[inputGroupName] = { enabled: false, inputs: [] };
        if (this.inputGroups[inputGroupName].inputs.find(input => input.name === name)) {
            return false; // input already exists
        }

        const input: Input = { name: name, keys: (typeof keys === 'string' ? [keys] : keys), pressed: false, justPressed: false, justReleased: false };
        if (events) {
            input.events = events as PressEvent[];
        }

        this.inputGroups[inputGroupName].inputs.push(input);
        return true;
    }

    /**
     * 
     * @param inputGroupName 
     * @param name 
     * @returns 
     * @description removes input from input group
     */

    public removeInput(inputGroupName: string, name: string): boolean {
        if (!this.inputGroups[inputGroupName]) return false;
        const input = this.inputGroups[inputGroupName].inputs.find(input => input.name === name);
        if (!input) {
            return false;
        }

        this.inputGroups[inputGroupName].inputs.splice(this.inputGroups[inputGroupName].inputs.indexOf(input), 1);
        return true;
    }


    /**
     * 
     * @param inputGroupName 
     * @param name 
     * @returns 
     * @description returns input from input group
     */

    public getInput(inputGroupName: string, name: string): Input | false {
        if (!this.inputGroups[inputGroupName]) return false;
        return this.inputGroups[inputGroupName].inputs.find(input => input.name === name) || false;
    }

    /**
     * 
     * @returns 
     * @description returns all inputs from all input groups
     */
    public getAllInputs(): Input[] {
        let inputs: Input[] = [];
        Object.keys(this.inputGroups).forEach(inputGroupName => {
            inputs = inputs.concat(this.inputGroups[inputGroupName].inputs);
        });
        return inputs;
    }

    /**
     * 
     * @param inputGroupName 
     * @returns 
     * @description returns all inputs from input group
     */
    public getGroupInputs(inputGroupName: string): Input[] {
        if (!this.inputGroups[inputGroupName]) return [];
        return this.inputGroups[inputGroupName].inputs;
    }

    /**
     * 
     * @param inputGroupName 
     * @returns 
     * @description returns if any input from input group is pressed
     */
    public isAnyKeyPressed(inputGroupName?: string): boolean {
        if (inputGroupName) {
            if (!this.inputGroups[inputGroupName]) return false;
            return this.inputGroups[inputGroupName].inputs.some(input => input.pressed);
        }
        return this.getAllInputs().some(input => input.pressed);
    }

    /**
     * 
     * @param inputGroupName 
     * @returns 
     * @description returns if any input from input group is just pressed
     */

    public isAnyKeyJustPressed(inputGroupName?: string): boolean {
        if (inputGroupName) {
            if (!this.inputGroups[inputGroupName]) return false;
            return this.inputGroups[inputGroupName].inputs.some(input => input.justPressed);
        }
        return this.getAllInputs().some(input => input.justPressed);
    }

    /**
     * 
     * @param inputGroupName 
     * @returns 
     * @description returns if any input from input group is just released
     */

    public isAnyKeyJustReleased(inputGroupName?: string): boolean {
        if (inputGroupName) {
            if (!this.inputGroups[inputGroupName]) return false;
            return this.inputGroups[inputGroupName].inputs.some(input => input.justReleased);
        }
        return this.getAllInputs().some(input => input.justReleased);
    }

    /**
     * 
     * @param inputGroupName 
     * @returns 
     * @description returns all just pressed inputs from input group
     */
    public getJustPressedKeys(inputGroupName?: string): string[] {
        if (inputGroupName) {
            if (!this.inputGroups[inputGroupName]) return [];
            return this.inputGroups[inputGroupName].inputs.filter(input => input.justPressed).map(input => input.name);
        }
        let justPressedKeys: string[] = this.getAllInputs().filter(input => input.justPressed).map(input => input.name);
        //remove duplicates
        justPressedKeys = justPressedKeys.filter((item, pos) => justPressedKeys.indexOf(item) == pos);
        return justPressedKeys;
    }

    /**
     * 
     * @param inputGroupName 
     * @returns 
     * @description returns all just released inputs from input group
     */

    public getJustReleasedKeys(inputGroupName?: string): string[] {
        if (inputGroupName) {
            if (!this.inputGroups[inputGroupName]) return [];
            return this.inputGroups[inputGroupName].inputs.filter(input => input.justReleased).map(input => input.name);
        }
        let justReleasedKeys: string[] = this.getAllInputs().filter(input => input.justReleased).map(input => input.name);
        //remove duplicates
        justReleasedKeys = justReleasedKeys.filter((item, pos) => justReleasedKeys.indexOf(item) == pos);
        return justReleasedKeys;
    }


    /**
     * 
     * @param inputGroupName 
     * @returns 
     * @description returns all pressed inputs from input group
     */

    public getPressedKeys(inputGroupName?: string): string[] {
        if (inputGroupName) {
            if (!this.inputGroups[inputGroupName]) return [];
            return this.inputGroups[inputGroupName].inputs.filter(input => input.pressed).map(input => input.name);
        }
        let pressedKeys: string[] = this.getAllInputs().filter(input => input.pressed).map(input => input.name);
        //remove duplicates
        pressedKeys = pressedKeys.filter((item, pos) => pressedKeys.indexOf(item) == pos);
        return pressedKeys;
    }


    /*
    public getDirectionFromMouse(entity: Entity): number {
        const mousePosition = this.getMousePosition();
        const entityPosition = entity.getPosition();
        const direction = Math.atan2(mousePosition.y - entityPosition.y, mousePosition.x - entityPosition.x) * 180 / Math.PI;
        return direction;
        // const direction = { x: mousePosition.x - entityPosition.x, y: mousePosition.y - entityPosition.y };
        //return direction;
    }
    */



    /**
     * 
     * @description updates all inputs, should be called every tick at the end of the frame
     */
    public update(): void {

        Object.keys(this.inputGroups).forEach(inputGroupName => {
            if (this.inputGroups[inputGroupName].enabled) {
                this.inputGroups[inputGroupName].inputs.forEach(input => {
                    input.justPressed = false;
                    input.justReleased = false;
                });
            }
        });

        this.keyboardKeys.forEach(key => {
            key.justPressed = false;
            key.justReleased = false;
        });

    }

    /**
     * 
     * @param preventDefault 
     * @description creates new input manager
     */
    constructor(preventDefault: boolean = false) {
        this.preventDefault = preventDefault;
        document.addEventListener('keydown', (event) => {
            if (this.preventDefault) event.preventDefault();

            //for each enabled input group
            Object.keys(this.inputGroups).forEach(inputGroupName => {
                if (this.inputGroups[inputGroupName].enabled) {
                    //for each input in the group
                    this.inputGroups[inputGroupName].inputs.forEach(input => {
                        //if the key is pressed
                        if (!input.pressed && input.keys.includes(event.key)) {
                            input.pressed = true;
                            input.justPressed = true;
                        }
                    });
                }
            });

            //this.keyboardKeys[event.key] = {key:event.key, justPressed:true, pressed:true, justReleased:false, events:[]} //TUTAJ
            const key = this.keyboardKeys.find(key => key.key === event.key);
            if (key) {
                key.pressed = true;
                key.justPressed = true;
                //call events if onPress is true
                for (let i = 0; i < key.events.length; i++) {
                    if (key.events[i].onPress) key.events[i].event(key.key);
                }

            } else {
                this.keyboardKeys.push({ key: event.key, justPressed: true, pressed: true, justReleased: false, events: [] });
            }

        }

        );
        document.addEventListener('keyup', (event) => {
            if (this.preventDefault) event.preventDefault();

            //for each enabled input group
            Object.keys(this.inputGroups).forEach(inputGroupName => {
                if (this.inputGroups[inputGroupName].enabled) {
                    //for each input in the group
                    this.inputGroups[inputGroupName].inputs.forEach(input => {
                        //if the key is pressed
                        if (input.keys.includes(event.key)) {
                            input.pressed = false;
                            input.justReleased = true;
                        }
                    });
                }
            });

            //this.keyboardKeys[event.key] = {key:event.key, justPressed:false, pressed:false, justReleased:true, events:[]} //TUTAJ
            const key = this.keyboardKeys.find(key => key.key === event.key);
            if (key) {
                key.pressed = false;
                key.justReleased = true;
                //call events if onRelease is true
                for (let i = 0; i < key.events.length; i++) {
                    if (!key.events[i].onPress) key.events[i].event(key.key);
                }
            } else {
                this.keyboardKeys.push({ key: event.key, justPressed: false, pressed: false, justReleased: true, events: [] });
            }
        }
        );
    }
}
