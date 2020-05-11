namespace L04_Snake3D {
    export class ArrayDTO {
        public functionArray: number[];
        public directionTable: Record<number, DirectionDTO>;
        public rotation: RotationsDTO;

        constructor (_functionArray: number[], _rotation: RotationsDTO, _directionTable: Record<number, DirectionDTO>) {
            this.functionArray = _functionArray;
            this.rotation = _rotation;
            this.directionTable = _directionTable;
        }
    }
}