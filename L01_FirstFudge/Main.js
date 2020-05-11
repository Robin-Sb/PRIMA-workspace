"use strict";
var L02_FirstFudge;
(function (L02_FirstFudge) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.Debug.log(canvas);
        let node = new ƒ.Node("Quad");
        let mesh = new ƒ.MeshQuad();
        let cmpMesh = new ƒ.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
        let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);
        let scndNode = new ƒ.Node("Cube");
        let scndmesh = new ƒ.MeshSphere();
        let scndcmpMesh = new ƒ.ComponentMesh(scndmesh);
        scndNode.addComponent(scndcmpMesh);
        let green = new ƒ.Material("Green", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("GREEN")));
        let scndCmpMaterial = new ƒ.ComponentMaterial(green);
        scndNode.addComponent(scndCmpMaterial);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(2);
        cmpCamera.pivot.rotateY(180);
        let main_node = new ƒ.Node("Main");
        main_node.appendChild(scndNode);
        main_node.appendChild(node);
        L02_FirstFudge.viewport = new ƒ.Viewport();
        L02_FirstFudge.viewport.initialize("Viewport", main_node, cmpCamera, canvas);
        ƒ.Debug.log(L02_FirstFudge.viewport);
        console.log("executed");
        L02_FirstFudge.viewport.draw();
    }
})(L02_FirstFudge || (L02_FirstFudge = {}));
//# sourceMappingURL=Main.js.map