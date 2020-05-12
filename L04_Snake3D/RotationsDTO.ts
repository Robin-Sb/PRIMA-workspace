namespace L04_Snake3D {
    import fudge = FudgeCore;
    export class RotationsDTO {
        public leftKey: fudge.Matrix4x4;
        public rightKey: fudge.Matrix4x4;

        
        constructor (_leftKey: fudge.Matrix4x4, _rightKey: fudge.Matrix4x4) {
            this.leftKey = _leftKey;
            this.rightKey = _rightKey;
        }
    }
}