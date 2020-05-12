namespace L04_Snake3D {
    import fudge = FudgeCore;

    window.addEventListener("load", hndLoad);
    // let snake: Snake = new Snake();
    export let viewport: fudge.Viewport;      
    let main: fudge.Node = new fudge.Node("MainNode");
    let cube: fudge.Node = new fudge.Node("Cube");
    let snake: Snake = new Snake();
    let scalar: number = 9;

    function hndLoad(_event: Event): void {
      const canvas: HTMLCanvasElement = document.querySelector("canvas");
      fudge.Debug.log(canvas);

      let mesh: fudge.MeshCube = new fudge.MeshCube();
      let color: fudge.Color = new fudge.Color(); 
      color.setNormRGBA(0.3, 0.3, 0.3, 0);
      let mtrGray: fudge.Material = new fudge.Material("Gray", fudge.ShaderUniColor, new fudge.CoatColored(color));
      let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
    
      cube.addComponent(cmpMesh);
      let cmpMaterial: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrGray);
      cube.addComponent(cmpMaterial);
      cube.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(new fudge.Vector3(0, 0, 0))));
      cube.mtxLocal.scale(fudge.Vector3.ONE(scalar));

      main.appendChild(cube);
      main.appendChild(snake);

      let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
      cmpCamera.pivot.translateZ(25);
      cmpCamera.pivot.translate(new fudge.Vector3(0, 0, 0));
      cmpCamera.pivot.rotateY(180);

      viewport = new fudge.Viewport();
      viewport.initialize("Viewport", main, cmpCamera, canvas);
      fudge.Debug.log(viewport);
      fudge.Loop.addEventListener("loopFrame", main_loop);
      fudge.Loop.start(fudge.LOOP_MODE.TIME_REAL, 8);
    }

    function main_loop(_event: Event): void {
        snake.move();
        moveCamera();
        viewport.draw();
    }

    function moveCamera(): void {
      let posCamera: fudge.Vector3 = fudge.Vector3.NORMALIZATION(snake.getChildren()[0].mtxLocal.translation, 30);
      viewport.camera.pivot.translation = posCamera;
      viewport.camera.pivot.lookAt(fudge.Vector3.ZERO());
    }
  } 
