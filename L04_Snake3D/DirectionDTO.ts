namespace L04_Snake3D {
    import ƒ = FudgeCore;

    export class DirectionDTO {
        public newFace: string;
        public rotation: ƒ.Matrix4x4;

        constructor(_newFace: string, _rotation: ƒ.Matrix4x4) {
            this.newFace = _newFace;
            this.rotation = _rotation;
        }
    }
}