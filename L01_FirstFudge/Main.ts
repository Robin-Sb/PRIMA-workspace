namespace L02_FirstFudge {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);
    export let viewport: ƒ.Viewport;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.Debug.log(canvas);

        let node: ƒ.Node = new ƒ.Node("Quad");

        let mesh: ƒ.MeshQuad = new ƒ.MeshQuad();
        let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
        node.addComponent(cmpMesh);

        let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);

        let scndNode: ƒ.Node = new ƒ.Node("Cube");

        let scndmesh: ƒ.MeshSphere = new ƒ.MeshSphere();
        let scndcmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(scndmesh);
        scndNode.addComponent(scndcmpMesh);

        let green: ƒ.Material = new ƒ.Material("Green", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("GREEN")));
        let scndCmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(green);
        scndNode.addComponent(scndCmpMaterial);

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(2);
        cmpCamera.pivot.rotateY(180);

        let main_node: ƒ.Node = new ƒ.Node("Main");

        main_node.appendChild(scndNode);
        main_node.appendChild(node);

        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", main_node, cmpCamera, canvas);
        ƒ.Debug.log(viewport);
        
        console.log("executed");
        viewport.draw();
    }
}