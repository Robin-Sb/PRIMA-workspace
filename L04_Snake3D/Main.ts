namespace L04_Snake3D {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);
    // let snake: Snake = new Snake();
    export let viewport: ƒ.Viewport;      
    let main: ƒ.Node = new ƒ.Node("MainNode");
    let cube: ƒ.Node = new ƒ.Node("Cube");
    let snake: Snake = new Snake();
    let scalar: number = 9;

  
    function hndLoad(_event: Event): void {
      const canvas: HTMLCanvasElement = document.querySelector("canvas");
      ƒ.Debug.log(canvas);

      let mesh: ƒ.MeshCube = new ƒ.MeshCube();
      let color: ƒ.Color = new ƒ.Color(); 
      color.setNormRGBA(0.3, 0.3, 0.3, 0);
      let mtrGray: ƒ.Material = new ƒ.Material("Gray", ƒ.ShaderUniColor, new ƒ.CoatColored(color));
      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
    
      cube.addComponent(cmpMesh);
      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrGray);
      cube.addComponent(cmpMaterial);
      cube.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0))));
      cube.mtxLocal.scale(new ƒ.Vector3(scalar, scalar, scalar));

      main.appendChild(cube);
      main.appendChild(snake);

      let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
      cmpCamera.pivot.translateZ(25);
      cmpCamera.pivot.translate(new ƒ.Vector3(0, 0, 0));
      cmpCamera.pivot.rotateY(180);

      viewport = new ƒ.Viewport();
      viewport.initialize("Viewport", main, cmpCamera, canvas);
      ƒ.Debug.log(viewport);
      ƒ.Loop.addEventListener("loopFrame", main_loop);
      ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 8);
    }

    function main_loop(_event: Event): void {
        snake.move();
        viewport.draw();
    }
  } 
