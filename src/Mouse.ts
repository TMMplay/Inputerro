

declare type KeyboardMgr = any;

export class MouseMgr {
    private preventDefault: boolean;
    private mouse: MouseEvents = { startLeftClick: false, startRightClick: false, startMiddleClick: false, startWheel: false, currentLeftClick: false, currentRightClick: false, currentMiddleClick: false, currentWheel: 0, LeftClickJustReleased: false, RightClickJustReleased: false, MiddleClickJustReleased: false }
    private currentMousePosition: Vector = { x: 0, y: 0 };
    private keyboardMgr;

    public update(): void {
        this.mouse.LeftClickJustReleased = false;
        this.mouse.RightClickJustReleased = false;
        this.mouse.MiddleClickJustReleased = false;
        this.mouse.currentWheel = 0;
    }

/**
 * 
 * @param button 
 * @returns 
 * @description The isMousePressed function checks the state of the mouse buttons, and returns true if the button is currently pressed, false otherwise. The MouseButton parameter is optional, and defaults to the left mouse button. The function will return true if the button is currently pressed, and false otherwise.
 */

public isMousePressed(button: MouseButton = 'l'): boolean {
        switch (button) {
            case 'l':
                return this.mouse.startLeftClick ? true : false;
            case 'm':
                return this.mouse.startMiddleClick ? true : false;
            case 'r':
                return this.mouse.startRightClick ? true : false;
        }
    }

  //  The isMouseJustPressed function checks the state of the mouse buttons, and returns true if the button was just pressed, false otherwise. The MouseButton parameter is optional, and defaults to the left mouse button. The function will return true if the button was just pressed, and false otherwise.
    /**
     * 
     * @param button 
     * @returns 
     * @description The isMouseJustPressed function checks the state of the mouse buttons, and returns true if the button was just pressed, false otherwise. The MouseButton parameter is optional, and defaults to the left mouse button. The function will return true if the button was just pressed, and false otherwise.
     * 
     */

    public isMouseJustReleased(button: MouseButton = 'l'): boolean {
        switch (button) {
            case 'l':
                return this.mouse.LeftClickJustReleased ? true : false;
            case 'm':
                return this.mouse.MiddleClickJustReleased ? true : false;
            case 'r':
                return this.mouse.RightClickJustReleased ? true : false;
        }
    }

    /**
     * 
     * @param button 
     * @returns 
     * @description The isMouseJustReleased function checks the state of the mouse buttons, and returns true if the button was just released, false otherwise. The MouseButton parameter is optional, and defaults to the left mouse button. The function will return true if the button was just released, and false otherwise.
     */
    public isMouseDragging(button: MouseButton = 'l'): boolean {
        switch (button) {
            case 'l':
                return this.mouse.currentLeftClick ? true : false;
            case 'm':
                return this.mouse.currentMiddleClick ? true : false;
            case 'r':
                return this.mouse.currentRightClick ? true : false;
        }
    }

    /**
     * 
     * @param button 
     * @returns 
     * @description The isMouseDragging function checks the state of the mouse buttons, and returns true if the button is currently being dragged, false otherwise. The MouseButton parameter is optional, and defaults to the left mouse button. The function will return true if the button is currently being dragged, and false otherwise.
     */

    public getMouseDrag(button: MouseButton = 'l'): { rotationDegree: number, distance: number, startPosition: Vector, endPosition: Vector, vector: Vector } | false {

        //if (!this.isMouseDragging(button)) return false;

        let _startPosition: { vector: Vector, keys: Key[] } | false;
        let _endPosition: { vector: Vector, keys: Key[] } | false;
        switch (button) {
            case 'l':
                _startPosition = this.mouse.startLeftClick ? { vector: this.mouse.startLeftClick.vector, keys: this.keyboardMgr.getPressedKeys() } : false;
                _endPosition = this.mouse.currentLeftClick ? { vector: this.mouse.currentLeftClick.vector, keys: this.keyboardMgr.getPressedKeys() } : false;
                break;
            case 'm':
                _startPosition = this.mouse.startMiddleClick ? { vector: this.mouse.startMiddleClick.vector, keys: this.keyboardMgr.getPressedKeys() } : false;
                _endPosition = this.mouse.currentMiddleClick ? { vector: this.mouse.currentMiddleClick.vector, keys: this.keyboardMgr.getPressedKeys() } : false;
                break;

            case 'r':
                _startPosition = this.mouse.startRightClick ? { vector: this.mouse.startRightClick.vector, keys: this.keyboardMgr.getPressedKeys() } : false;
                _endPosition = this.mouse.currentRightClick ? { vector: this.mouse.currentRightClick.vector, keys: this.keyboardMgr.getPressedKeys() } : false;
                break;
        }
        //  console.log('>>>', _startPosition, _endPosition);
        if (!_startPosition || !_endPosition) return false;
        const startPosition = _startPosition.vector;
        const endPosition = _endPosition.vector;
        let rotationDegree = Math.atan2(endPosition.y - startPosition.y, endPosition.x - startPosition.x) * 180 / Math.PI;
        let distance = Math.sqrt(Math.pow(endPosition.x - startPosition.x, 2) + Math.pow(endPosition.y - startPosition.y, 2));
        let vector = { x: endPosition.x - startPosition.x, y: endPosition.y - startPosition.y };
        return { rotationDegree, distance, startPosition, endPosition, vector };

    }

    /**
     * 
     * @returns 
     * @description returns the current mouse wheel value
     */
    public getMouseScroll(): number {
        return this.mouse.currentWheel;
    }


    /**
     * 
     * @returns 
     * @description returns the current mouse position releative to the window
     */
    public getMousePosition(): Vector {
        return this.currentMousePosition;
    }

    



    /**
     * 
     * @param preventDefault 
     * @param keyboardMgr 
     * @description The constructor for the MouseMgr class. The preventDefault parameter is optional, and defaults to false. If set to true, the default behavior of the mouse buttons will be prevented. The keyboardMgr parameter is optional, and defaults to undefined. If a KeyboardMgr object is passed in, the MouseMgr will use it to get the current state of the keyboard. If no KeyboardMgr object is passed in, the MouseMgr will create a new one.
     */
    constructor(preventDefault: boolean = false, keyboardMgr: KeyboardMgr | undefined = undefined) {

        this.preventDefault = preventDefault;

        if (!keyboardMgr) {
            keyboardMgr = {
                getPressedKeys: () => { return [] },
            }
        }

        this.keyboardMgr = keyboardMgr;

        window.addEventListener('contextmenu', (e) => {
            if (this.preventDefault) e.preventDefault();
        });

        window.addEventListener('mousedown', (e) => {
            if (this.preventDefault) e.preventDefault();
            let startPoint: Vector = { x: e.clientX, y: e.clientY };
            const clickObject: { vector: Vector, keys: Key[] } = { vector: startPoint, keys: keyboardMgr.getPressedKeys() };
            switch (e.button) {
                case 0:
                    this.mouse.startLeftClick = clickObject;
                    break;
                case 1:
                    this.mouse.startMiddleClick = clickObject;
                    break;
                case 2:
                    this.mouse.startRightClick = clickObject;
                    break;
            }
        });

        window.addEventListener('mousemove', (e) => {
            if (this.preventDefault) e.preventDefault();
            let currentPoint: Vector = { x: e.clientX, y: e.clientY };
            this.currentMousePosition = currentPoint;
            const clickObject: { vector: Vector, keys: Key[] } = { vector: currentPoint, keys: keyboardMgr.getPressedKeys() };
            if (/*e.button == 1 && */this.mouse.startLeftClick) {
                this.mouse.currentLeftClick = clickObject;
            }
            //console.log(e);
            if (/*e.button == 3 && */ this.mouse.startRightClick) {
                this.mouse.currentRightClick = clickObject;
            }
        });

        window.addEventListener('mouseup', (e) => {
            if (this.preventDefault) e.preventDefault();
            let currentPoint: Vector = { x: e.clientX, y: e.clientY };
            const clickObject: { vector: Vector, keys: Key[] } = { vector: currentPoint, keys: keyboardMgr.getPressedKeys() };
            switch (e.button) {
                case 0:
                    this.mouse.startLeftClick = false;
                    this.mouse.currentLeftClick = false;
                    this.mouse.LeftClickJustReleased = clickObject;
                    break;
                case 1:
                    this.mouse.startMiddleClick = false;
                    this.mouse.currentMiddleClick = false;
                    this.mouse.MiddleClickJustReleased = clickObject;
                    break;
                case 2:
                    this.mouse.startRightClick = false;
                    this.mouse.currentRightClick = false;
                    this.mouse.RightClickJustReleased = clickObject;
                    break;
            }


        });

        document.addEventListener('wheel', (e) => {
            this.mouse.currentWheel = e.deltaY * 0.01;
        }
        );
    }
}