class Node {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.visited = false;
        this.walls = [true, true, true, true];
    }

    drawWalls () {
        if (this.walls[0]) {
            this.drawTopWall(this.x, this.y, this.size);
        }

        if (this.walls[1]) {
            this.drawRightWall(this.x, this.y, this.size);
        }

        if (this.walls[2]) {
            this.drawBottomWall(this.x, this.y, this.size);
        }

        if (this.walls[3]) {
            this.drawLeftWall(this.x, this.y, this.size);
        }
    }


    drawRightWall(sx, sy, size) {
        ctx.beginPath();
        ctx.moveTo(sx + size, sy);
        ctx.lineTo(sx + size, sy + size);
        ctx.closePath();
        ctx.stroke();
    }

    drawTopWall(sx, sy, size) {
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + size, sy);
        ctx.closePath();
        ctx.stroke();
    }

    drawBottomWall(sx, sy, size) {
        ctx.beginPath();
        ctx.moveTo(sx + size, sy + size);
        ctx.lineTo(sx, sy + size);
        ctx.closePath();
        ctx.stroke();
    }

    drawLeftWall(sx, sy, size) {
        ctx.beginPath();
        ctx.moveTo(sx, sy + size);
        ctx.lineTo(sx, sy);
        ctx.closePath();
        ctx.stroke();
    }
}