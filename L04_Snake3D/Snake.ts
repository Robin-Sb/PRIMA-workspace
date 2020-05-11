namespace L04_Snake3D {    
    import ƒ = FudgeCore;
    export class Snake extends ƒ.Node {
        public directions: Array<ƒ.Vector3> = [ƒ.Vector3.X(), ƒ.Vector3.X(), ƒ.Vector3.X(), ƒ.Vector3.X()];
        public directionTable: Record <string, ArrayDTO>;
        public currentFace: string = "front";
        public snake: Snake = this;


        constructor() {
            super("Snake");
            this.createSegments(4);
            this.fillMappingTable();
            console.log("create snake");
        }

        public move(): void {
            this.updateMappingTable();
            let transformValues: ArrayDTO =  this.directionTable[this.currentFace];
            let currentDirection: ƒ.Vector3 = this.directions[0].copy;
            
            for (let i: number = 0; i < transformValues.functionArray.length; i++) {
                if (transformValues.functionArray[i] > 4 && transformValues.functionArray[i] > 0) {
                    let rotateMatrix: ƒ.Matrix4x4 = transformValues.directionTable[i].rotation;
                    this.currentFace = transformValues.directionTable[i].newFace;
                    currentDirection.transform(rotateMatrix);
                    break;
                }
            }
            let children: ƒ.Node[] = this.getChildren();

            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
                currentDirection.transform(transformValues.rotation.leftKey);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
                currentDirection.transform(transformValues.rotation.rightKey);
            }
            this.directions.unshift(currentDirection);
            this.directions.pop();
    
            for (let i: number = 0; i < this.directions.length; i++) {
                children[i].mtxLocal.translate(this.directions[i]);
            }
        }

        private updateMappingTable(): void {
            let currentTrans: ƒ.Vector3 = this.getChildren()[0].mtxLocal.translation;
            let frontBack: number[] = [currentTrans.x, currentTrans.y, -currentTrans.x, -currentTrans.y];
            let leftRight: number[] = [currentTrans.y, currentTrans.z, -currentTrans.y, -currentTrans.z];
            let topBottom: number[] = [currentTrans.x, currentTrans.z, -currentTrans.x, -currentTrans.z];

            this.directionTable["front"].functionArray = frontBack;
            this.directionTable["back"].functionArray = frontBack;
            this.directionTable["right"].functionArray = leftRight;
            this.directionTable["left"].functionArray = leftRight;
            this.directionTable["bottom"].functionArray = topBottom;
            this.directionTable["top"].functionArray = topBottom;
        }

        private fillMappingTable(): void {
            let currentTrans: ƒ.Vector3 = this.getChildren()[0].mtxLocal.translation;
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
                front: new ArrayDTO(frontBack, new RotationsDTO(ƒ.Matrix4x4.ROTATION_Z(90), ƒ.Matrix4x4.ROTATION_Z(-90)), {0: new DirectionDTO(right, ƒ.Matrix4x4.ROTATION_Y(90)), 1: new DirectionDTO(top,  ƒ.Matrix4x4.ROTATION_X(-90)), 2: new DirectionDTO(left,  ƒ.Matrix4x4.ROTATION_Y(-90)), 3: new DirectionDTO(bottom,  ƒ.Matrix4x4.ROTATION_X(90))}),
                right: new ArrayDTO(leftRight, new RotationsDTO(ƒ.Matrix4x4.ROTATION_X(90), ƒ.Matrix4x4.ROTATION_X(-90)), {0: new DirectionDTO(top, ƒ.Matrix4x4.ROTATION_Z(90)), 1: new DirectionDTO(front,  ƒ.Matrix4x4.ROTATION_Y(-90)), 2: new DirectionDTO(bottom,  ƒ.Matrix4x4.ROTATION_Z(-90)), 3: new DirectionDTO(back,  ƒ.Matrix4x4.ROTATION_Y(90))}),
                top: new ArrayDTO(topBottom, new RotationsDTO(ƒ.Matrix4x4.ROTATION_Y(90), ƒ.Matrix4x4.ROTATION_Y(-90)), {0: new DirectionDTO(right, ƒ.Matrix4x4.ROTATION_Z(-90)), 1: new DirectionDTO(front,  ƒ.Matrix4x4.ROTATION_X(90)), 2: new DirectionDTO(left,  ƒ.Matrix4x4.ROTATION_Z(90)), 3: new DirectionDTO(back,  ƒ.Matrix4x4.ROTATION_X(-90))}),
                left: new ArrayDTO(leftRight, new RotationsDTO(ƒ.Matrix4x4.ROTATION_X(-90), ƒ.Matrix4x4.ROTATION_X(90)), {0: new DirectionDTO(top, ƒ.Matrix4x4.ROTATION_Z(-90)), 1: new DirectionDTO(front,  ƒ.Matrix4x4.ROTATION_Y(90)), 2: new DirectionDTO(bottom,  ƒ.Matrix4x4.ROTATION_Z(90)), 3: new DirectionDTO(back,  ƒ.Matrix4x4.ROTATION_Y(-90))}),
                back: new ArrayDTO(frontBack, new RotationsDTO(ƒ.Matrix4x4.ROTATION_Z(-90), ƒ.Matrix4x4.ROTATION_Z(90)), {0: new DirectionDTO(right, ƒ.Matrix4x4.ROTATION_Y(-90)), 1: new DirectionDTO(top,  ƒ.Matrix4x4.ROTATION_X(90)), 2: new DirectionDTO(left,  ƒ.Matrix4x4.ROTATION_Y(90)), 3: new DirectionDTO(bottom,  ƒ.Matrix4x4.ROTATION_X(-90))}),
                bottom: new ArrayDTO(topBottom, new RotationsDTO(ƒ.Matrix4x4.ROTATION_Y(-90), ƒ.Matrix4x4.ROTATION_Y(90)), {0: new DirectionDTO(right, ƒ.Matrix4x4.ROTATION_Z(90)), 1: new DirectionDTO(front,  ƒ.Matrix4x4.ROTATION_X(-90)), 2: new DirectionDTO(left,  ƒ.Matrix4x4.ROTATION_Z(-90)), 3: new DirectionDTO(back,  ƒ.Matrix4x4.ROTATION_X(90))})
            };
        }

        private createSegments(segments: Number): void {
            let mesh: ƒ.MeshQuad = new ƒ.MeshQuad();
            let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
      
            for (let i: number = 0; i < segments; i++) {
                let node: ƒ.Node = new ƒ.Node("Quad");
          
                let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
                node.addComponent(cmpMesh);
                cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));
          
                let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
                node.addComponent(cmpMaterial);
          
                node.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(-1 * i, 0, 5))));
          
                this.appendChild(node);
            }
        }

    }

}