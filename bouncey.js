var svg = document.getElementById("board");
var clear = document.getElementById("clear");

var frame;
var anim = true;
var interval;

var rad = 10;
var color = "powderblue";

var circles = [];

var createCircle = function(x,y){
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    var ret = {
        x: x,
        y: y,
        r: rad,
        col: color,
        dx: Math.floor(Math.random() * 10),
        dy: Math.floor(Math.random() * 10),
        c: circle,
	
        draw: function(){
            this.c.setAttribute("cx",this.x);
            this.c.setAttribute("cy",this.y);
            this.c.setAttribute("r",this.r);
            this.c.setAttribute("fill",this.col);
            svg.appendChild(this.c);
        },
        move: function(){
            if (this.x <= this.r || this.x >= 500 - this.r) {
                this.dx *= -1;
            }
            if (this.y <= this.r || this.y >= 500 - this.r) {
                this.dy *= -1;
            }
            this.x += this.dx;
            this.y += this.dy;
        },
    }
    return ret;
}

var clicked = function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    if (anim) {
        interval = setInterval(animate, 20);
        anim = !anim;
    }
    circles.push(createCircle(x,y));
}

var animate = function(){
    for (var i = 0 ; i < circles.length; i++){
	circles[i].move();
	circles[i].draw();
    }
}

var clearIt = function(){
    clearInterval(interval);
    circles = [];
    while(svg.children.length > 0){
        svg.removeChild(svg.lastChild);
    }
    anim = true;
}

svg.addEventListener("click",clicked);
clear.addEventListener("click", clearIt);
