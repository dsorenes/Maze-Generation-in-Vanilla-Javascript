const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const width = 600;
const height = 400;

let nodesize = 20;
let columns = width / nodesize;
let rows = height / nodesize;

let stack = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let nodes = new Array(columns);
//creates the grid and nodes
for (let x = 0; x <= columns; x++) {
    nodes[x] = new Array(rows);
    for (let y = 0; y <= rows; y++) {
        let node = new Node(x * nodesize, y * nodesize, nodesize);
        nodes[x][y] = new Node(x * nodesize, y * nodesize, nodesize);

        //coordinate text
        // ctx.fillText(`${node.nodex}, ${node.nodey}`, x * nodesize, y * nodesize + 100 / 10);
    }
}

function drawRightWall(sx, sy, size) {
    ctx.beginPath();
    ctx.moveTo(sx + size, sy);
    ctx.lineTo(sx + size, sy + size);
    ctx.closePath();
    ctx.stroke();
}

function drawTopWall(sx, sy, size) {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + size, sy);
    ctx.closePath();
    ctx.stroke();
}

function drawBottomWall(sx, sy, size) {
    ctx.beginPath();
    ctx.moveTo(sx + size, sy + size);
    ctx.lineTo(sx, sy + size);
    ctx.closePath();
    ctx.stroke();
}

function drawLeftWall(sx, sy, size) {
    ctx.beginPath();
    ctx.moveTo(sx, sy + size);
    ctx.lineTo(sx, sy);
    ctx.closePath();
    ctx.stroke();
}

function getNeighbors (node) {
    let neighbors = [];
    let startNode = node;

    for (let node of nodes) {
        for (let n of node) {
            if (Math.abs(n.nodex - startNode.nodex) === nodesize && Math.abs(n.nodey - startNode.nodey) === nodesize) {
            } else if (Math.abs(n.nodex - startNode.nodex) <= nodesize && Math.abs(n.nodey - startNode.nodey) <= nodesize) {
                if (n.visited === false) {
                    neighbors.push(n);

                    // console.log(`${n.nodex}, ${n.nodey} is neighbor of ${startNode.nodex}, ${startNode.nodey}`);
                }

            }
        }
        
    }

    return neighbors;
}

function chooseNeighbor (node) {
    let neighbors = getNeighbors(node);
    let next;
    
    if (neighbors.length > 0) {
        next = neighbors[getRandomInt(neighbors.length)];
    } else {
        return undefined;
    }

    return next;
}

function removeWalls(previous, next) {
    let node = previous;

    if (next.nodex > node.nodex) {
        next.walls[3] = false;
        node.walls[1] = false;
    }

    if (next.nodex < node.nodex) {
        next.walls[1] = false;
        node.walls[3] = false;
    }

    if (next.nodey > node.nodey) {
        next.walls[0] = false;
        node.walls[2] = false;
    }

    if (next.nodey < node.nodey) {
        next.walls[2] = false;
        node.walls[0] = false;
    }

}

function draw () {
    current.drawWalls();
    
    ctx.fillStyle = 'white';
    ctx.fillRect(current.nodex, current.nodey, nodesize, nodesize);
    
    if (!stack.includes(current)) {
        stack.push(current);
    }

    let next = chooseNeighbor(current);
    if (next) {
        removeWalls(current, next);
        ctx.fillStyle = 'white';
        ctx.fillRect(current.nodex, current.nodey, nodesize, nodesize);

        current = next;
        current.visited = true;

        ctx.fillStyle = 'black';
        ctx.fillRect(next.nodex, next.nodey, nodesize, nodesize); 
    }

    if (!next) {
        stack.pop();
        current = stack[stack.length - 1];
        next = chooseNeighbor(current);
    }
}

let generation = setInterval(draw, 10);

