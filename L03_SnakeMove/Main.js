"use strict";
var L03_SnakeMove;
(function (L03_SnakeMove) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    let snake = new L03_SnakeMove.Snake();
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.Debug.log(canvas);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(10);
        cmpCamera.pivot.rotateY(180);
        L03_SnakeMove.viewport = new ƒ.Viewport();
        L03_SnakeMove.viewport.initialize("Viewport", snake, cmpCamera, canvas);
        ƒ.Debug.log(L03_SnakeMove.viewport);
        ƒ.Loop.addEventListener("loopFrame", main_loop);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 10);
    }
    function main_loop(_event) {
        snake.my_move();
        // let children: ƒ.Node[] = snake.getChildren();
        // for (var i = 0; i < children.length; i++) {
        //     children[i].cmpTransform.local.translateX(0.05);
        // }
        // checkBorderCollisions();
        L03_SnakeMove.viewport.draw();
    }
    // function checkBorderCollisions(): void {
    //     let transforms: Float32Array = snake.getChildren()[0].mtxLocal.get();
    // }
})(L03_SnakeMove || (L03_SnakeMove = {}));
//# sourceMappingURL=Main.js.map