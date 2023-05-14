# Inputerro
is rich input library for TypeScript / JavaScript alpications.

Project is still in early stage and there will be some breaking changes in usage.



# Usage
```
const keyboardMgr = new KeyboardMgr(true); // true for disable all default events like refreshing page for F5

keyboardMgr.updateMapping("Gameplay",[
        {name:"moveRight", keys:["d","arrowright"]},
        {name:"moveLeft", keys:["a","arrowleft"]},
        {name:"moveUp", keys:["w","arrowup"]},
        {name:"moveDown", keys:["s","arrowdown"]},
        {name:"jump", keys:[" "]}
    ]);

keyboardMgr.updateMapping("Gameplay-menu",[
        {name:"openMenu", keys:["tab","escape", "backspace"], events:[{onPress:true,event:openScoreboard},{onPress:false,event:closeScoreboard}]}
    ]);
    
function tick() {
    if (keyboardMgr.isKeyPressed("Gameplay", "moveRight")) moveDuck(1,0);
    if (keyboardMgr.isKeyPressed("Gameplay", "moveLeft")) moveDuck(-1,0);
    if (keyboardMgr.isKeyPressed("Gameplay", "moveUp")) moveDuck(0,-1);
    if (keyboardMgr.isKeyPressed("Gameplay", "moveDown")) moveDuck(0,1);
    keyboardMgr.isKeyJustPressed("Gameplay", "jump"); jump();
    
    keyboardMgr.update();
}

function openScoreboard(){
    //open scoreboard
}


function closeScoreboard(){
    //close scoreboard
}


```


# Documentation
TO DO


### entry for TOOL JAM 3
