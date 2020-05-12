namespace L04_Snake3D {
    export class ArrayDTO {
        public snakeCoordinates: number[];
        public directionTable: Record<number, DirectionDTO>;
        public rotation: RotationsDTO;

        constructor (_snakeCoordinates: number[], _rotation: RotationsDTO, _directionTable: Record<number, DirectionDTO>) {
            this.snakeCoordinates = _snakeCoordinates;
            this.rotation = _rotation;
            this.directionTable = _directionTable;
        }
    }
}