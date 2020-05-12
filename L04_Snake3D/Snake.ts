namespace L04_Snake3D {
  import fudge = FudgeCore;
  export class Snake extends fudge.Node {
    public directions: Array<fudge.Vector3> = [fudge.Vector3.X(), fudge.Vector3.X(), fudge.Vector3.X(), fudge.Vector3.X()];
    public directionTable: Record<string, ArrayDTO>;
    public currentFace: string = "front";

    constructor() {
      super("Snake");
      this.createSegments(4);
      this.fillMappingTable();
      console.log("create snake");
    }

    public move(): void {
      this.updateMappingTable();
      let transformValues: ArrayDTO = this.directionTable[this.currentFace];
      let currentDirection: fudge.Vector3 = this.directions[0].copy;

      for (let i: number = 0; i < transformValues.snakeCoordinates.length; i++) {
        if (transformValues.snakeCoordinates[i] > 4 && transformValues.snakeCoordinates[i] > 0) {
          let rotationMatrix: fudge.Matrix4x4 = transformValues.directionTable[i].rotation;
          this.currentFace = transformValues.directionTable[i].newFace;
          currentDirection.transform(rotationMatrix);
        }
      }
      let children: fudge.Node[] = this.getChildren();

      if (fudge.Keyboard.isPressedOne([fudge.KEYBOARD_CODE.A])) {
        currentDirection.transform(transformValues.rotation.leftKey);
      }
      if (fudge.Keyboard.isPressedOne([fudge.KEYBOARD_CODE.D])) {
        currentDirection.transform(transformValues.rotation.rightKey);
      }
      this.directions.unshift(currentDirection);
      this.directions.pop();

      for (let i: number = 0; i < this.directions.length; i++) {
        children[i].mtxLocal.translate(this.directions[i]);
      }
    }

    private updateMappingTable(): void {
      let currentTrans: fudge.Vector3 = this.getChildren()[0].mtxLocal.translation;
      let frontBack: number[] = [currentTrans.x, currentTrans.y, -currentTrans.x, -currentTrans.y];
      let leftRight: number[] = [currentTrans.y, currentTrans.z, -currentTrans.y, -currentTrans.z];
      let topBottom: number[] = [currentTrans.x, currentTrans.z, -currentTrans.x, -currentTrans.z];

      this.directionTable["front"].snakeCoordinates = frontBack;
      this.directionTable["back"].snakeCoordinates = frontBack;
      this.directionTable["right"].snakeCoordinates = leftRight;
      this.directionTable["left"].snakeCoordinates = leftRight;
      this.directionTable["bottom"].snakeCoordinates = topBottom;
      this.directionTable["top"].snakeCoordinates = topBottom;
    }

    private fillMappingTable(): void {
      let currentTrans: fudge.Vector3 = this.getChildren()[0].mtxLocal.translation;
      let frontBack: number[] = [currentTrans.x, currentTrans.y, -currentTrans.x, -currentTrans.y];
      let leftRight: number[] = [currentTrans.y, currentTrans.z, -currentTrans.y, -currentTrans.z];
      let topBottom: number[] = [currentTrans.x, currentTrans.z, -currentTrans.x, -currentTrans.z];
      let right: string = "right";
      let left: string = "left";
      let front: string = "front";
      let top: string = "top";
      let bottom: string = "bottom";
      let back: string = "back";

      this.directionTable = {
        front: new ArrayDTO(frontBack, new RotationsDTO(fudge.Matrix4x4.ROTATION_Z(90), fudge.Matrix4x4.ROTATION_Z(-90)), { 0: new DirectionDTO(right, fudge.Matrix4x4.ROTATION_Y(90)), 1: new DirectionDTO(top, fudge.Matrix4x4.ROTATION_X(-90)), 2: new DirectionDTO(left, fudge.Matrix4x4.ROTATION_Y(-90)), 3: new DirectionDTO(bottom, fudge.Matrix4x4.ROTATION_X(90)) }),
        right: new ArrayDTO(leftRight, new RotationsDTO(fudge.Matrix4x4.ROTATION_X(90), fudge.Matrix4x4.ROTATION_X(-90)), { 0: new DirectionDTO(top, fudge.Matrix4x4.ROTATION_Z(90)), 1: new DirectionDTO(front, fudge.Matrix4x4.ROTATION_Y(-90)), 2: new DirectionDTO(bottom, fudge.Matrix4x4.ROTATION_Z(-90)), 3: new DirectionDTO(back, fudge.Matrix4x4.ROTATION_Y(90)) }),
        top: new ArrayDTO(topBottom, new RotationsDTO(fudge.Matrix4x4.ROTATION_Y(90), fudge.Matrix4x4.ROTATION_Y(-90)), { 0: new DirectionDTO(right, fudge.Matrix4x4.ROTATION_Z(-90)), 1: new DirectionDTO(front, fudge.Matrix4x4.ROTATION_X(90)), 2: new DirectionDTO(left, fudge.Matrix4x4.ROTATION_Z(90)), 3: new DirectionDTO(back, fudge.Matrix4x4.ROTATION_X(-90)) }),
        left: new ArrayDTO(leftRight, new RotationsDTO(fudge.Matrix4x4.ROTATION_X(-90), fudge.Matrix4x4.ROTATION_X(90)), { 0: new DirectionDTO(top, fudge.Matrix4x4.ROTATION_Z(-90)), 1: new DirectionDTO(front, fudge.Matrix4x4.ROTATION_Y(90)), 2: new DirectionDTO(bottom, fudge.Matrix4x4.ROTATION_Z(90)), 3: new DirectionDTO(back, fudge.Matrix4x4.ROTATION_Y(-90)) }),
        back: new ArrayDTO(frontBack, new RotationsDTO(fudge.Matrix4x4.ROTATION_Z(-90), fudge.Matrix4x4.ROTATION_Z(90)), { 0: new DirectionDTO(right, fudge.Matrix4x4.ROTATION_Y(-90)), 1: new DirectionDTO(top, fudge.Matrix4x4.ROTATION_X(90)), 2: new DirectionDTO(left, fudge.Matrix4x4.ROTATION_Y(90)), 3: new DirectionDTO(bottom, fudge.Matrix4x4.ROTATION_X(-90)) }),
        bottom: new ArrayDTO(topBottom, new RotationsDTO(fudge.Matrix4x4.ROTATION_Y(-90), fudge.Matrix4x4.ROTATION_Y(90)), { 0: new DirectionDTO(right, fudge.Matrix4x4.ROTATION_Z(90)), 1: new DirectionDTO(front, fudge.Matrix4x4.ROTATION_X(-90)), 2: new DirectionDTO(left, fudge.Matrix4x4.ROTATION_Z(-90)), 3: new DirectionDTO(back, fudge.Matrix4x4.ROTATION_X(90)) })
      };
    }

    private createSegments(segments: Number): void {
      let mesh: fudge.MeshCube = new fudge.MeshCube();
      let mtrSolidWhite: fudge.Material = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")));

      for (let i: number = 0; i < segments; i++) {
        let node: fudge.Node = new fudge.Node("Quad");

        let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        cmpMesh.pivot.scale(fudge.Vector3.ONE(0.8));

        let cmpMaterial: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);

        node.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(new fudge.Vector3(-1 * i, 0, 5))));

        this.appendChild(node);
      }
    }
  }
}