var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (!this.isValidCoordinate(x) || !this.isValidCoordinate(y)) {
            throw new Error("Invalid coordinates: x and y must be numbers.");
        }
        this.x = x;
        this.y = y;
    }
    Point.prototype.move = function (new_x, new_y) {
        if (!this.isValidCoordinate(new_x) || !this.isValidCoordinate(new_y)) {
            throw new Error("Invalid coordinates: new_x and new_y must be numbers.");
        }
        this.x = new_x;
        this.y = new_y;
    };
    Point.prototype.isValidCoordinate = function (value) {
        return typeof value === "number" && !isNaN(value);
    };
    return Point;
}());
var Rectangle = /** @class */ (function () {
    function Rectangle(topLeft, bottomRight) {
        this.topLeft = topLeft;
        this.topRight = new Point(bottomRight.x, topLeft.y);
        this.bottomLeft = new Point(topLeft.x, bottomRight.y);
        this.bottomRight = bottomRight;
    }
    Rectangle.prototype.move = function (newTopLeftX, newTopLeftY) {
        var width = this.topRight.x - this.topLeft.x;
        var height = this.bottomLeft.y - this.topLeft.y;
        this.topLeft.move(newTopLeftX, newTopLeftY);
        this.topRight.move(newTopLeftX + width, newTopLeftY);
        this.bottomLeft.move(newTopLeftX, newTopLeftY + height);
        this.bottomRight.move(newTopLeftX + width, newTopLeftY + height);
    };
    Rectangle.prototype.getArea = function () {
        var width = this.topRight.x - this.topLeft.x;
        var height = this.bottomLeft.y - this.topLeft.y;
        return Math.abs(width) * Math.abs(height);
    };
    Rectangle.prototype.getPerimeter = function () {
        var width = Math.abs(this.topRight.x - this.topLeft.x);
        var height = Math.abs(this.bottomLeft.y - this.topLeft.y);
        return 2 * (width + height);
    };
    Rectangle.prototype.scale = function (factor) {
        var centerX = (this.topLeft.x + this.bottomRight.x) / 2;
        var centerY = (this.topLeft.y + this.bottomRight.y) / 2;
        function scalePoint(point) {
            var dx = point.x - centerX;
            var dy = point.y - centerY;
            return new Point(centerX + dx * factor, centerY + dy * factor);
        }
        this.topLeft = scalePoint(this.topLeft);
        this.topRight = scalePoint(this.topRight);
        this.bottomLeft = scalePoint(this.bottomLeft);
        this.bottomRight = scalePoint(this.bottomRight);
    };
    return Rectangle;
}());
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(topLeft, sideLength) {
        var bottomRight = new Point(topLeft.x + sideLength, topLeft.y - sideLength);
        return _super.call(this, topLeft, bottomRight) || this;
    }
    Square.prototype.move = function (newTopLeftX, newTopLeftY) {
        var sideLength = this.topRight.x - this.topLeft.x;
        _super.prototype.move.call(this, newTopLeftX, newTopLeftY);
        this.topRight = new Point(this.topLeft.x + sideLength, this.topLeft.y);
        this.bottomLeft = new Point(this.topLeft.x, this.topLeft.y - sideLength);
        this.bottomRight = new Point(this.topLeft.x + sideLength, this.topLeft.y - sideLength);
    };
    Square.prototype.setSideLength = function (newLength) {
        if (newLength <= 0) {
            throw new Error("Side length must be greater than 0.");
        }
        this.topRight = new Point(this.topLeft.x + newLength, this.topLeft.y);
        this.bottomLeft = new Point(this.topLeft.x, this.topLeft.y - newLength);
        this.bottomRight = new Point(this.topLeft.x + newLength, this.topLeft.y - newLength);
    };
    Square.prototype.getSideLength = function () {
        return this.topRight.x - this.topLeft.x;
    };
    return Square;
}(Rectangle));
var topLeftRectangle = new Point(1, 4);
var bottomRightRectangle = new Point(5, 1);
var rectangle = new Rectangle(topLeftRectangle, bottomRightRectangle);
console.log("Pierwotne wsp\u00F3\u0142rz\u0119dne prostok\u0105ta:");
console.log("TopLeft: (".concat(rectangle.topLeft.x, ", ").concat(rectangle.topLeft.y, ")"));
console.log("TopRight: (".concat(rectangle.topRight.x, ", ").concat(rectangle.topRight.y, ")"));
console.log("BottomLeft: (".concat(rectangle.bottomLeft.x, ", ").concat(rectangle.bottomLeft.y, ")"));
console.log("BottomRight: (".concat(rectangle.bottomRight.x, ", ").concat(rectangle.bottomRight.y, ")"));
console.log("Pole prostok\u0105ta: ".concat(rectangle.getArea()));
console.log("Obw\u00F3d prostok\u0105ta: ".concat(rectangle.getPerimeter()));
rectangle.move(2, 3);
console.log("Po przesuni\u0119ciu prostok\u0105ta:");
console.log("TopLeft: (".concat(rectangle.topLeft.x, ", ").concat(rectangle.topLeft.y, ")"));
console.log("BottomRight: (".concat(rectangle.bottomRight.x, ", ").concat(rectangle.bottomRight.y, ")"));
rectangle.scale(2);
console.log("Po skalowaniu prostok\u0105ta:");
console.log("TopLeft: (".concat(rectangle.topLeft.x, ", ").concat(rectangle.topLeft.y, ")"));
console.log("BottomRight: (".concat(rectangle.bottomRight.x, ", ").concat(rectangle.bottomRight.y, ")"));
console.log("Pole prostok\u0105ta: ".concat(rectangle.getArea()));
console.log("Obw\u00F3d prostok\u0105ta: ".concat(rectangle.getPerimeter()));
var topLeftSquare = new Point(2, 5);
var square = new Square(topLeftSquare, 3);
console.log("\nPierwotne wsp\u00F3\u0142rz\u0119dne kwadratu:");
console.log("TopLeft: (".concat(square.topLeft.x, ", ").concat(square.topLeft.y, ")"));
console.log("TopRight: (".concat(square.topRight.x, ", ").concat(square.topRight.y, ")"));
console.log("BottomLeft: (".concat(square.bottomLeft.x, ", ").concat(square.bottomLeft.y, ")"));
console.log("BottomRight: (".concat(square.bottomRight.x, ", ").concat(square.bottomRight.y, ")"));
console.log("Pole kwadratu: ".concat(square.getArea()));
console.log("Obw\u00F3d kwadratu: ".concat(square.getPerimeter()));
square.move(4, 6);
console.log("Po przesuni\u0119ciu kwadratu:");
console.log("TopLeft: (".concat(square.topLeft.x, ", ").concat(square.topLeft.y, ")"));
console.log("BottomRight: (".concat(square.bottomRight.x, ", ").concat(square.bottomRight.y, ")"));
square.setSideLength(5);
console.log("Po zmianie d\u0142ugo\u015Bci boku kwadratu:");
console.log("TopLeft: (".concat(square.topLeft.x, ", ").concat(square.topLeft.y, ")"));
console.log("BottomRight: (".concat(square.bottomRight.x, ", ").concat(square.bottomRight.y, ")"));
console.log("Pole kwadratu: ".concat(square.getArea()));
console.log("Obw\u00F3d kwadratu: ".concat(square.getPerimeter()));
