import { KeyboardMgr } from "./Keyboard";
import { MouseMgr } from "./Mouse";
import {GamepadMgr} from "./Gamepad";

const keyboardMgr = new KeyboardMgr(true);
const mouseMgr = new MouseMgr(true,keyboardMgr);
const gamepadMgr = new GamepadMgr();


//@ts-ignore
window.Inputerro = {
    keyboardMgr,
    mouseMgr,
    gamepadMgr
};