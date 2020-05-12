namespace L04_Snake3D {
    import fudge = FudgeCore;

    export class DirectionDTO {
        public newFace: string;
        public rotation: fudge.Matrix4x4;

        constructor(_newFace: string, _rotation: fudge.Matrix4x4) {
            this.newFace = _newFace;
            this.rotation = _rotation;
        }
    }
}