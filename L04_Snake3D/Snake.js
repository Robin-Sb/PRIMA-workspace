"use strict";
var L04_Snake3D;
(function (L04_Snake3D) {
    var ƒ = FudgeCore;
    class Snake extends ƒ.Node {
        constructor() {
            super("Snake");
            this.directions = [ƒ.Vector3.X(), ƒ.Vector3.X(), ƒ.Vector3.X(), ƒ.Vector3.X()];
            this.currentFace = "front";
            this.createSegments(4);
            this.fillMappingTable();
            console.log("create snake");
        }
        move() {
            this.updateMappingTable();
            let transformValues = this.directionTable[this.currentFace];
            let currentDirection = this.directions[0].copy;
            for (let i = 0; i < transformValues.snakeCoordinates.length; i++) {
                if (transformValues.snakeCoordinates[i] > 4 && transformValues.snakeCoordinates[i] > 0) {
                    let rotationMatrix = transformValues.directionTable[i].rotation;
                    this.currentFace = transformValues.directionTable[i].newFace;
                    currentDirection.transform(rotationMatrix);
                }
            }
            let children = this.getChildren();
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
                currentDirection.transform(transformValues.rotation.leftKey);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
                currentDirection.transform(transformValues.rotation.rightKey);
            }
            this.directions.unshift(currentDirection);
            this.directions.pop();
            for (let i = 0; i < this.directions.length; i++) {
                children[i].mtxLocal.translate(this.directions[i]);
            }
        }
        updateMappingTable() {
            let currentTrans = this.getChildren()[0].mtxLocal.translation;
            let frontBack = [currentTrans.x, currentTrans.y, -currentTrans.x, -currentTrans.y];
            let leftRight = [currentTrans.y, currentTrans.z, -currentTrans.y, -currentTrans.z];
            let topBottom = [currentTrans.x, currentTrans.z, -currentTrans.x, -currentTrans.z];
            this.directionTable["front"].snakeCoordinates = frontBack;
            this.directionTable["back"].snakeCoordinates = frontBack;
            this.directionTable["right"].snakeCoordinates = leftRight;
            this.directionTable["left"].snakeCoordinates = leftRight;
            this.directionTable["bottom"].snakeCoordinates = topBottom;
            this.directionTable["top"].snakeCoordinates = topBottom;
        }
        fillMappingTable() {
            let currentTrans = this.getChildren()[0].mtxLocal.translation;
            let frontBack = [currentTrans.x, currentTrans.y, -currentTrans.x, -currentTrans.y];
            let leftRight = [currentTrans.y, currentTrans.z, -currentTrans.y, -currentTrans.z];
            let topBottom = [currentTrans.x, currentTrans.z, -currentTrans.x, -currentTrans.z];
            let right = "right";
            let left = "left";
            let front = "front";
            let top = "top";
            let bottom = "bottom";
            let back = "back";
            this.directionTable = {
                front: new L04_Snake3D.ArrayDTO(frontBack, new L04_Snake3D.RotationsDTO(ƒ.Matrix4x4.ROTATION_Z(90), ƒ.Matrix4x4.ROTATION_Z(-90)), { 0: new L04_Snake3D.DirectionDTO(right, ƒ.Matrix4x4.ROTATION_Y(90)), 1: new L04_Snake3D.DirectionDTO(top, ƒ.Matrix4x4.ROTATION_X(-90)), 2: new L04_Snake3D.DirectionDTO(left, ƒ.Matrix4x4.ROTATION_Y(-90)), 3: new L04_Snake3D.DirectionDTO(bottom, ƒ.Matrix4x4.ROTATION_X(90)) }),
                right: new L04_Snake3D.ArrayDTO(leftRight, new L04_Snake3D.RotationsDTO(ƒ.Matrix4x4.ROTATION_X(90), ƒ.Matrix4x4.ROTATION_X(-90)), { 0: new L04_Snake3D.DirectionDTO(top, ƒ.Matrix4x4.ROTATION_Z(90)), 1: new L04_Snake3D.DirectionDTO(front, ƒ.Matrix4x4.ROTATION_Y(-90)), 2: new L04_Snake3D.DirectionDTO(bottom, ƒ.Matrix4x4.ROTATION_Z(-90)), 3: new L04_Snake3D.DirectionDTO(back, ƒ.Matrix4x4.ROTATION_Y(90)) }),
                top: new L04_Snake3D.ArrayDTO(topBottom, new L04_Snake3D.RotationsDTO(ƒ.Matrix4x4.ROTATION_Y(90), ƒ.Matrix4x4.ROTATION_Y(-90)), { 0: new L04_Snake3D.DirectionDTO(right, ƒ.Matrix4x4.ROTATION_Z(-90)), 1: new L04_Snake3D.DirectionDTO(front, ƒ.Matrix4x4.ROTATION_X(90)), 2: new L04_Snake3D.DirectionDTO(left, ƒ.Matrix4x4.ROTATION_Z(90)), 3: new L04_Snake3D.DirectionDTO(back, ƒ.Matrix4x4.ROTATION_X(-90)) }),
                left: new L04_Snake3D.ArrayDTO(leftRight, new L04_Snake3D.RotationsDTO(ƒ.Matrix4x4.ROTATION_X(-90), ƒ.Matrix4x4.ROTATION_X(90)), { 0: new L04_Snake3D.DirectionDTO(top, ƒ.Matrix4x4.ROTATION_Z(-90)), 1: new L04_Snake3D.DirectionDTO(front, ƒ.Matrix4x4.ROTATION_Y(90)), 2: new L04_Snake3D.DirectionDTO(bottom, ƒ.Matrix4x4.ROTATION_Z(90)), 3: new L04_Snake3D.DirectionDTO(back, ƒ.Matrix4x4.ROTATION_Y(-90)) }),
                back: new L04_Snake3D.ArrayDTO(frontBack, new L04_Snake3D.RotationsDTO(ƒ.Matrix4x4.ROTATION_Z(-90), ƒ.Matrix4x4.ROTATION_Z(90)), { 0: new L04_Snake3D.DirectionDTO(right, ƒ.Matrix4x4.ROTATION_Y(-90)), 1: new L04_Snake3D.DirectionDTO(top, ƒ.Matrix4x4.ROTATION_X(90)), 2: new L04_Snake3D.DirectionDTO(left, ƒ.Matrix4x4.ROTATION_Y(90)), 3: new L04_Snake3D.DirectionDTO(bottom, ƒ.Matrix4x4.ROTATION_X(-90)) }),
                bottom: new L04_Snake3D.ArrayDTO(topBottom, new L04_Snake3D.RotationsDTO(ƒ.Matrix4x4.ROTATION_Y(-90), ƒ.Matrix4x4.ROTATION_Y(90)), { 0: new L04_Snake3D.DirectionDTO(right, ƒ.Matrix4x4.ROTATION_Z(90)), 1: new L04_Snake3D.DirectionDTO(front, ƒ.Matrix4x4.ROTATION_X(-90)), 2: new L04_Snake3D.DirectionDTO(left, ƒ.Matrix4x4.ROTATION_Z(-90)), 3: new L04_Snake3D.DirectionDTO(back, ƒ.Matrix4x4.ROTATION_X(90)) })
            };
        }
        createSegments(segments) {
            let mesh = new ƒ.MeshQuad();
            let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
            for (let i = 0; i < segments; i++) {
                let node = new ƒ.Node("Quad");
                let cmpMesh = new ƒ.ComponentMesh(mesh);
                node.addComponent(cmpMesh);
                cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.8));
                let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
                node.addComponent(cmpMaterial);
                node.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(-1 * i, 0, 5))));
                this.appendChild(node);
            }
        }
    }
    L04_Snake3D.Snake = Snake;
})(L04_Snake3D || (L04_Snake3D = {}));
//# sourceMappingURL=Snake.js.map