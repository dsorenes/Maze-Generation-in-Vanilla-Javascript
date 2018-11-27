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
        nodes[x][y] = node;

        //coordinate text
        // ctx.fillText(`${node.x}, ${node.y}`, x * nodesize, y * nodesize + 100 / 10);
    }
}

function getNeighbors (node) {
    let neighbors = [];
    let startNode = node;

    for (let node of nodes) {
        for (let n of node) {
            if (Math.abs(n.x - startNode.x) === nodesize && Math.abs(n.y - startNode.y) === nodesize) {
            } else if (Math.abs(n.x - startNode.x) <= nodesize && Math.abs(n.y - startNode.y) <= nodesize) {
                if (n.visited === false) {
                    neighbors.push(n);

                    // console.log(`${n.x}, ${n.y} is neighbor of ${startNode.x}, ${startNode.y}`);
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

    if (next.x > node.x) {
        next.walls[3] = false;
        node.walls[1] = false;
    }

    if (next.x < node.x) {
        next.walls[1] = false;
        node.walls[3] = false;
    }

    if (next.y > node.y) {
        next.walls[0] = false;
        node.walls[2] = false;
    }

    if (next.y < node.y) {
        next.walls[2] = false;
        node.walls[0] = false;
    }

}

let current = nodes[0][0];
current.visited = true;

function draw () {
    current.drawWalls();
    
    ctx.fillStyle = 'white';
    ctx.fillRect(current.x, current.y, nodesize, nodesize);
    
    if (!stack.includes(current)) {
        stack.push(current);
    }

    let next = chooseNeighbor(current);
    if (next) {
        removeWalls(current, next);
        ctx.fillStyle = 'white';
        ctx.fillRect(current.x, current.y, nodesize, nodesize);

        current = next;
        current.visited = true;

        ctx.fillStyle = 'black';
        ctx.fillRect(next.x, next.y, nodesize, nodesize); 
    }

    if (!next) {
        stack.pop();
        current = stack[stack.length - 1];
        next = chooseNeighbor(current);
    }
}

let generation = setInterval(draw, 10);


