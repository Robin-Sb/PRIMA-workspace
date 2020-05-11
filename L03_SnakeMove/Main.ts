namespace L03_SnakeMove {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);
    let snake: Snake = new Snake();
    export let viewport: ƒ.Viewport;
  
    function hndLoad(_event: Event): void {
      const canvas: HTMLCanvasElement = document.querySelector("canvas");
      ƒ.Debug.log(canvas);
  
      let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
      cmpCamera.pivot.translateZ(10);
      cmpCamera.pivot.rotateY(180);
  
      viewport = new ƒ.Viewport();
      viewport.initialize("Viewport", snake, cmpCamera, canvas);
      ƒ.Debug.log(viewport);
  
      ƒ.Loop.addEventListener("loopFrame", main_loop);
      ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 10);
    }

    function main_loop(_event: Event): void {
        snake.my_move();
        // let children: ƒ.Node[] = snake.getChildren();
        // for (var i = 0; i < children.length; i++) {
        //     children[i].cmpTransform.local.translateX(0.05);
        // }


        // checkBorderCollisions();
        viewport.draw();
    }

    // function checkBorderCollisions(): void {
    //     let transforms: Float32Array = snake.getChildren()[0].mtxLocal.get();
    // }
  } 
