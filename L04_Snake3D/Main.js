"use strict";
var L04_Snake3D;
(function (L04_Snake3D) {
    var fudge = FudgeCore;
    window.addEventListener("load", hndLoad);
    let main = new fudge.Node("MainNode");
    let cube = new fudge.Node("Cube");
    let snake = new L04_Snake3D.Snake();
    let scalar = 9;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        fudge.Debug.log(canvas);
        let mesh = new fudge.MeshCube();
        let color = new fudge.Color();
        color.setNormRGBA(0.3, 0.3, 0.3, 0);
        let mtrGray = new fudge.Material("Gray", fudge.ShaderUniColor, new fudge.CoatColored(color));
        let cmpMesh = new fudge.ComponentMesh(mesh);
        cube.addComponent(cmpMesh);
        let cmpMaterial = new fudge.ComponentMaterial(mtrGray);
        cube.addComponent(cmpMaterial);
        cube.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(new fudge.Vector3(0, 0, 0))));
        cube.mtxLocal.scale(fudge.Vector3.ONE(scalar));
        main.appendChild(cube);
        main.appendChild(snake);
        let cmpCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translateZ(25);
        cmpCamera.pivot.translate(new fudge.Vector3(0, 0, 0));
        cmpCamera.pivot.rotateY(180);
        L04_Snake3D.viewport = new fudge.Viewport();
        L04_Snake3D.viewport.initialize("Viewport", main, cmpCamera, canvas);
        fudge.Debug.log(L04_Snake3D.viewport);
        fudge.Loop.addEventListener("loopFrame", main_loop);
        fudge.Loop.start(fudge.LOOP_MODE.TIME_REAL, 8);
    }
    function main_loop(_event) {
        snake.move();
        moveCamera();
        L04_Snake3D.viewport.draw();
    }
    function moveCamera() {
        let posCamera = fudge.Vector3.NORMALIZATION(snake.getChildren()[0].mtxLocal.translation, 30);
        L04_Snake3D.viewport.camera.pivot.translation = posCamera;
        L04_Snake3D.viewport.camera.pivot.lookAt(fudge.Vector3.ZERO());
    }
})(L04_Snake3D || (L04_Snake3D = {}));
//# sourceMappingURL=Main.js.map