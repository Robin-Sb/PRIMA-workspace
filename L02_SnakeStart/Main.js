"use strict";
var L02_SnakeStart;
(function (L02_SnakeStart) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    let snake = new ƒ.Node("Snake");
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.Debug.log(canvas);
        let mesh = new ƒ.MeshQuad();
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
        for (let i = 0; i < 4; i++) {
            let node = new ƒ.Node("Quad");
            let cmpMesh = new ƒ.ComponentMesh(mesh);
            node.addComponent(cmpMesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));
            let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
            node.addComponent(cmpMaterial);
            node.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(-1 * i, 0, 0))));
            snake.appendChild(node);
        }
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(10);
        cmpCamera.pivot.rotateY(180);
        L02_SnakeStart.viewport = new ƒ.Viewport();
        L02_SnakeStart.viewport.initialize("Viewport", snake, cmpCamera, canvas);
        ƒ.Debug.log(L02_SnakeStart.viewport);
        ƒ.Loop.addEventListener("loopFrame", testLoop);
        ƒ.Loop.start(ƒ.LOOP_MODE.FRAME_REQUEST, 1);
    }
    function testLoop(_event) {
        let children = snake.getChildren();
        for (var i = 0; i < children.length; i++) {
            children[i].cmpTransform.local.translateX(0.05);
        }
        L02_SnakeStart.viewport.draw();
    }
})(L02_SnakeStart || (L02_SnakeStart = {}));
//# sourceMappingURL=Main.js.map