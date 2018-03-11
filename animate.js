var clear = document.getElementById("clear");
var svg = document.getElementById("board");

var nodes = [];
var id = null;

var clearIt = function(e){
    clearInterval(id);
    while (svg.hasChildNodes()){
	svg.removeChild(svg.firstChild);
    }
};

var circle = function(e){
    var radius = 10;
    var x = e.offsetX;
    var y = e.offsetY;
    var xIncrement = 2;
    var yIncrement = 1;
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx",x);
    c.setAttribute("cy",y);
    c.setAttribute("r",radius);
    c.setAttribute("fill","powderblue");
    c.setAttribute("xInc",xIncrement);
    c.setAttribute("yInc",yIncrement);
    console.log(c.getAttribute("xInc"));
    
    
    nodes.push(c);
    svg.appendChild(c);
    id = setInterval(move,10);
}


var move = function(){
    for (i=0; i<nodes.length; i++){
	if( nodes[i].getAttribute("cx") == "500" || nodes[i].getAttribute("cx") == "0"){
	    console.log(parseInt(nodes[i].getAttribute("xInc") * -1));
	    nodes[i].setAttribute("xInc", (nodes[i].getAttribute("xInc")*-1));
	}
	if ( nodes[i].getAttribute("cy") == 500 || nodes[i].getAttribute("cy") == 0 ){
	    var yInc = (parseInt(nodes[i].getAttribute("yInc")) * -1);
	    nodes[i].setAttribute("yInc",yInc);
	}
	var xVal = parseInt(nodes[i].getAttribute("cx"));
	var xInc = parseInt(nodes[i].getAttribute("xInc"));
	var newX = (xVal + xInc);
	nodes[i].setAttribute("cx", newX);
	var yVal = parseInt(nodes[i].getAttribute("cy"));
	var yInc = parseInt(nodes[i].getAttribute("yInc"));
	var newY = (yVal + yInc);
	nodes[i].setAttribute("cy", newY);
    }
};

clear.addEventListener("click", clearIt);
svg.addEventListener("click", circle);
