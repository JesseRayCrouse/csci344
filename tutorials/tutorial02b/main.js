let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
// in p5.js, the function runs on page load:
function setup() {
    createCanvas(canvasWidth, canvasHeight);

    // invoke any drawing functions inside of setup.
    // functions should all go between "createCanvas()" and "drawGrid()"
    draw5CirclesWhile();
    draw5CirclesFor();
    drawNCircles(20);
    drawNCirclesFlexible(30, 25, 400, 0);
    drawNShapesFlexible(30, 30, 200, 600,circle);
    drawNShapesDirectionFlexible(10,10,100,200,square,"column");
    drawNShapesDirectionFlexible(10,30,200,200,circle,"row");
     {

    // draw5RedSquares();
    drawGrid(canvasWidth, canvasHeight);
    
}

// my first function
function draw5Circles() {
    noFill();
    // fill('red');
    circle(100, 200, 50); // centerX, centerY, radius
    circle(100, 250, 50);
    circle(100, 300, 50);
    circle(100, 350, 50);
    circle(100, 400, 50);
}

function draw5RedSquares() {
    fill("red");
    square(320, 200, 50); // topLeftX, topLeftY, width
    square(320, 250, 50);
    square(320, 300, 50);
    square(320, 350, 50);
    square(320, 400, 50);
}

function draw5CirclesWhile()  {
    console.log("draw 5 circles");

    let i = 0;
    let y = 200;
    while (i < 10) {
        circle(100, y, 50);
        console.log(i);  // Outputs 0, 1, 2, 3, 4
        y +=50;
        i++;
    }
}


function draw5CirclesFor() {

    let x = 100;
    for (let i = 0; i < 5; i++) {
        circle(x, 100, 30);
        console.log(i);
        x +=50;
      }
}


function drawNCircles(n) {

    let y = 100;
    for (let i = 0; i < n; i++) {
        circle(500, y, 50);
        console.log(i);
        y += 50;
      } 
}


function drawNCirclesFlexible(n, size, x, y) {

    for (let i = 0; i < n; i++) {
     circle(x,y, size);
     console.log(i);
     y += 50;
    }
}


function drawNShapesFlexible(n, size, x, y, shape) {

    for (let i =0; i < n; i++) {
     shape(x,y,size);
     console.log(i);
     x += 50;
    }
}


function drawNShapesDirectionFlexible(n, size, x, y, shape, direction) {
   
    for (let i = 0; i < n; i++) {

        if (direction === "column") {
            shape(x,y,size);
            console.log(i);
            y += size;
        } else if (direction === "row") {
            shape(x,y,size);
            console.log(i);
            x += size;
        }
    }
}
}