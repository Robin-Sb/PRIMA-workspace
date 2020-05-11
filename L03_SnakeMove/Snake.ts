namespace L03_SnakeMove {    
    import ƒ = FudgeCore;
    export class Snake extends ƒ.Node {
        //public direction: ƒ.Vector3 = ƒ.Vector3.X();
        //public my_direction: number = 0;
        public directions: Array<ƒ.Vector3> = [ƒ.Vector3.X(), ƒ.Vector3.X(), ƒ.Vector3.X(), ƒ.Vector3.X()];
        //public directions: Array<number> = [0, 0, 0, 0];
        //private numberToDirectionMap: Array<ƒ.Vector3> = [ƒ.Vector3.X(), ƒ.Vector3.Y(), ƒ.Vector3.X(-1), ƒ.Vector3.Y(-1)];

        constructor() {
            super("Snake");
            this.createSegments(4);
            console.log("create snake");
        }

        public my_move(): void {
            // let current_direction = this.directions[0];
            this.addEventListener("keydown", this.control);

            let children: ƒ.Node[] = this.getChildren();
            
            for (let i: number = 0; i < this.directions.length; i++) {
                //this.directions[i].scale(0.3);
                //children[i].mtxLocal.translate(this.numberToDirectionMap[this.directions[i]]);
                children[i].mtxLocal.translate(this.directions[i]);
            }
        }
        public control(): void {
            console.log(this);
            let currentDirection: ƒ.Vector3 = this.directions[0].copy;
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
                currentDirection.transform(ƒ.Matrix4x4.ROTATION_Z(90));
                // current_direction++;
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
                currentDirection.transform(ƒ.Matrix4x4.ROTATION_Z(-90));

                // if (current_direction == 0) {
                //     current_direction = 3;
                // } else {
                //     current_direction--;
                // }
            }

            // current_direction = current_direction%4;
            // this.directions.unshift(current_direction);
            // this.directions.pop();
            this.directions.unshift(currentDirection);
            this.directions.pop();
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
          
                node.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(-1 * i, 0, 0))));
          
                this.appendChild(node);
            }
        }

    }

}