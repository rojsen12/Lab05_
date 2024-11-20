class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        if (!this.isValidCoordinate(x) || !this.isValidCoordinate(y)) {
            throw new Error("Invalid coordinates: x and y must be numbers.");
        }
        this.x = x;
        this.y = y;
    }

    move(new_x: number, new_y: number) {
        if (!this.isValidCoordinate(new_x) || !this.isValidCoordinate(new_y)) {
            throw new Error("Invalid coordinates: new_x and new_y must be numbers.");
        }
        this.x = new_x;
        this.y = new_y;
    }

    private isValidCoordinate(value: any): boolean {
        return typeof value === "number" && !isNaN(value);
    }
}

class Rectangle {
    topLeft: Point;
    topRight: Point;
    bottomLeft: Point;
    bottomRight: Point;

    constructor(topLeft: Point, bottomRight: Point) {
        this.topLeft = topLeft;
        this.topRight = new Point(bottomRight.x, topLeft.y);
        this.bottomLeft = new Point(topLeft.x, bottomRight.y);
        this.bottomRight = bottomRight;
    }

    move(newTopLeftX: number, newTopLeftY: number) {
        const width = this.topRight.x - this.topLeft.x;
        const height = this.bottomLeft.y - this.topLeft.y;

        this.topLeft.move(newTopLeftX, newTopLeftY);
        this.topRight.move(newTopLeftX + width, newTopLeftY);
        this.bottomLeft.move(newTopLeftX, newTopLeftY + height);
        this.bottomRight.move(newTopLeftX + width, newTopLeftY + height);
    }

    getArea(): number {
        const width = this.topRight.x - this.topLeft.x;
        const height = this.bottomLeft.y - this.topLeft.y;
        return Math.abs(width) * Math.abs(height);
    }

    getPerimeter(): number {
        const width = Math.abs(this.topRight.x - this.topLeft.x);
        const height = Math.abs(this.bottomLeft.y - this.topLeft.y);
        return 2 * (width + height);
    }

    scale(factor: number) {
        const centerX = (this.topLeft.x + this.bottomRight.x) / 2;
        const centerY = (this.topLeft.y + this.bottomRight.y) / 2;

        function scalePoint(point: Point): Point {
            const dx = point.x - centerX;
            const dy = point.y - centerY;
            return new Point(centerX + dx * factor, centerY + dy * factor);
        }

        this.topLeft = scalePoint(this.topLeft);
        this.topRight = scalePoint(this.topRight);
        this.bottomLeft = scalePoint(this.bottomLeft);
        this.bottomRight = scalePoint(this.bottomRight);
    }
}

class Square extends Rectangle {
    constructor(topLeft: Point, sideLength: number) {
        const bottomRight = new Point(topLeft.x + sideLength, topLeft.y - sideLength);
        super(topLeft, bottomRight);
    }

    move(newTopLeftX: number, newTopLeftY: number) {
        const sideLength = this.topRight.x - this.topLeft.x; 
        super.move(newTopLeftX, newTopLeftY); 

        this.topRight = new Point(this.topLeft.x + sideLength, this.topLeft.y);
        this.bottomLeft = new Point(this.topLeft.x, this.topLeft.y - sideLength);
        this.bottomRight = new Point(this.topLeft.x + sideLength, this.topLeft.y - sideLength);
    }

    setSideLength(newLength: number) {
        if (newLength <= 0) {
            throw new Error("Side length must be greater than 0.");
        }

        this.topRight = new Point(this.topLeft.x + newLength, this.topLeft.y);
        this.bottomLeft = new Point(this.topLeft.x, this.topLeft.y - newLength);
        this.bottomRight = new Point(this.topLeft.x + newLength, this.topLeft.y - newLength);
    }

    getSideLength(): number {
        return this.topRight.x - this.topLeft.x; 
    }
}

const topLeftRectangle = new Point(1, 4);
const bottomRightRectangle = new Point(5, 1);
const rectangle = new Rectangle(topLeftRectangle, bottomRightRectangle);

console.log(`Pierwotne współrzędne prostokąta:`);
console.log(`TopLeft: (${rectangle.topLeft.x}, ${rectangle.topLeft.y})`);
console.log(`TopRight: (${rectangle.topRight.x}, ${rectangle.topRight.y})`);
console.log(`BottomLeft: (${rectangle.bottomLeft.x}, ${rectangle.bottomLeft.y})`);
console.log(`BottomRight: (${rectangle.bottomRight.x}, ${rectangle.bottomRight.y})`);

console.log(`Pole prostokąta: ${rectangle.getArea()}`);
console.log(`Obwód prostokąta: ${rectangle.getPerimeter()}`);

rectangle.move(2, 3);
console.log(`Po przesunięciu prostokąta:`);
console.log(`TopLeft: (${rectangle.topLeft.x}, ${rectangle.topLeft.y})`);
console.log(`BottomRight: (${rectangle.bottomRight.x}, ${rectangle.bottomRight.y})`);

rectangle.scale(2);
console.log(`Po skalowaniu prostokąta:`);
console.log(`TopLeft: (${rectangle.topLeft.x}, ${rectangle.topLeft.y})`);
console.log(`BottomRight: (${rectangle.bottomRight.x}, ${rectangle.bottomRight.y})`);
console.log(`Pole prostokąta: ${rectangle.getArea()}`);
console.log(`Obwód prostokąta: ${rectangle.getPerimeter()}`);

const topLeftSquare = new Point(2, 5);
const square = new Square(topLeftSquare, 3);

console.log(`\nPierwotne współrzędne kwadratu:`);
console.log(`TopLeft: (${square.topLeft.x}, ${square.topLeft.y})`);
console.log(`TopRight: (${square.topRight.x}, ${square.topRight.y})`);
console.log(`BottomLeft: (${square.bottomLeft.x}, ${square.bottomLeft.y})`);
console.log(`BottomRight: (${square.bottomRight.x}, ${square.bottomRight.y})`);

console.log(`Pole kwadratu: ${square.getArea()}`);
console.log(`Obwód kwadratu: ${square.getPerimeter()}`);

square.move(4, 6);
console.log(`Po przesunięciu kwadratu:`);
console.log(`TopLeft: (${square.topLeft.x}, ${square.topLeft.y})`);
console.log(`BottomRight: (${square.bottomRight.x}, ${square.bottomRight.y})`);

square.setSideLength(5);
console.log(`Po zmianie długości boku kwadratu:`);
console.log(`TopLeft: (${square.topLeft.x}, ${square.topLeft.y})`);
console.log(`BottomRight: (${square.bottomRight.x}, ${square.bottomRight.y})`);
console.log(`Pole kwadratu: ${square.getArea()}`);
console.log(`Obwód kwadratu: ${square.getPerimeter()}`);


