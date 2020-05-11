"use strict";
var L04_Snake3D;
(function (L04_Snake3D) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    let main = new ƒ.Node("MainNode");
    let cube = new ƒ.Node("Cube");
    let snake = new L04_Snake3D.Snake();
    let scalar = 9;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.Debug.log(canvas);
        let mesh = new ƒ.MeshCube();
        let color = new ƒ.Color();
        color.setNormRGBA(0.3, 0.3, 0.3, 0);
        let mtrGray = new ƒ.Material("Gray", ƒ.ShaderUniColor, new ƒ.CoatColored(color));
        let cmpMesh = new ƒ.ComponentMesh(mesh);
        cube.addComponent(cmpMesh);
        let cmpMaterial = new ƒ.ComponentMaterial(mtrGray);
        cube.addComponent(cmpMaterial);
        cube.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0))));
        cube.mtxLocal.scale(new ƒ.Vector3(scalar, scalar, scalar));
        main.appendChild(cube);
        main.appendChild(snake);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(25);
        cmpCamera.pivot.translate(new ƒ.Vector3(0, 0, 0));
        cmpCamera.pivot.rotateY(180);
        L04_Snake3D.viewport = new ƒ.Viewport();
        L04_Snake3D.viewport.initialize("Viewport", main, cmpCamera, canvas);
        ƒ.Debug.log(L04_Snake3D.viewport);
        ƒ.Loop.addEventListener("loopFrame", main_loop);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 8);
    }
    function main_loop(_event) {
        snake.move();
        L04_Snake3D.viewport.draw();
    }
})(L04_Snake3D || (L04_Snake3D = {}));
//# sourceMappingURL=Main.js.map