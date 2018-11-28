const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const width = 600;
const height = 600;

const nodesize = 40;
const rows = width / nodesize;
const columns = height / nodesize;

let stack = [];

function getRandomInt(max) {

    return Math.floor(Math.random() * Math.floor(max));

}

let nodes = new Array(rows);

//creates the grid and the nodes within it
function createGrid() {

    for (let x = 0; x < rows; x++) {

        nodes[x] = new Array(columns);

        for (let y = 0; y < columns; y++) {

            let node = new Node(x * nodesize, y * nodesize, nodesize);
            nodes[x][y] = node;

            //coordinate text
            // ctx.fillText(`${node.x}, ${node.y}`, x * nodesize, y * nodesize + 100 / 10);
        }
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

function removeWalls(current, next) {

    if (next.x > current.x) {

        next.walls[3] = false;
        current.walls[1] = false;

    }

    if (next.x < current.x) {

        next.walls[1] = false;
        current.walls[3] = false;

    }

    if (next.y > current.y) {

        next.walls[0] = false;
        current.walls[2] = false;

    }

    if (next.y < current.y) {

        next.walls[2] = false;
        current.walls[0] = false;

    }

}

//initialise
createGrid();
let current = nodes[0][0];
current.visited = true;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, width, height);


function generate () {

    current.drawWalls();
    
    ctx.fillStyle = '#F8F8FF';
    ctx.fillRect(current.x, current.y, nodesize, nodesize);
    
    if (!stack.includes(current)) {

        stack.push(current);

    }

    //creates the outer maze walls
    ctx.strokeRect(0, 0, width, height);

    let next = chooseNeighbor(current);

    if (next) {

        removeWalls(current, next);
        ctx.fillStyle = '#F8F8FF';
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

        ctx.fillStyle = 'black';
        ctx.fillRect(current.x, current.y, nodesize, nodesize);

        if (stack.length === 1) {

            clearInterval(generation);

            //creates the start and end of the maze
            ctx.fillStyle = '#F8F8FF';
            ctx.fillRect(nodes[rows - 1][columns - 1].x, nodes[rows - 1][columns - 1].y, nodesize, nodesize);
            ctx.fillRect(nodes[0][0].x, nodes[0][0].y, nodesize, nodesize);

        }

    }
    
}

let generation = setInterval(generate, 10);