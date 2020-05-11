namespace L04_Snake3D {
    import ƒ = FudgeCore;
    export class RotationsDTO {
        public leftKey: ƒ.Matrix4x4;
        public rightKey: ƒ.Matrix4x4;

        
        constructor (_leftKey: ƒ.Matrix4x4, _rightKey: ƒ.Matrix4x4) {
            this.leftKey = _leftKey;
            this.rightKey = _rightKey;
        }
    }
}