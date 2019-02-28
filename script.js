
var canvas = document.getElementById('mat');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var sizeReference = canvas.width;

var cxt = canvas.getContext('2d');

var ballX = canvas.width/2;
var ballY = canvas.height/2;

var ballRad  = (sizeReference/91);

var ballSpeed = 22;
var sideSpeed = 5;
var acc		  = 1;

var isDown = true;
var isStart = false;

var Speed = 3;
var landMark = 2*canvas.width;

var decRate = canvas.width/100;

var Up;
var Lf;
var Rt;
var Dn;

var padCount = 0;
var padAlt   = 1;

var padWidth  = sizeReference/20;
var padHeight = sizeReference/70;

var padY = new Array(30);
var padX = new Array(30);

for(var i = 0; i < padX.length; i++){
  padX[i] = new Array(2);
}
for(var i = 0; i < padY.length; i++){
  padY[i] = new Array(2);
}

	window.addEventListener("keyup", KeyUp, false);
	window.addEventListener("keydown", KeyDown, false);

function KeyDown(key){
	
	if(key.keyCode == '87' || key.keyCode == '80' || key.keyCode == '38'){		//up
		
		Up = true;
		Dn = false;
		
	}else if(key.keyCode == '65' || key.keyCode == '76' || key.keyCode == '37'){	//left
		
		Lf = true;
		Rt = false;
		
	}else if(key.keyCode == '68' || key.keyCode == '222' || key.keyCode == '39'){	//right
		
		Rt = true;
		Lf = false;
		
	}
	
}

function KeyUp(key){
	
	if(key.keyCode == '87' || key.keyCode == '80' || key.keyCode == '38'){
		
		Up = false;
		
	}else if(key.keyCode == '65' || key.keyCode == '76' || key.keyCode == '37'){
		
		Lf = false;
		
	}else if(key.keyCode == '68' || key.keyCode == '222' || key.keyCode == '39'){
		
		Rt = false;
		
	}
	
}

padStart();

function Animate(){
	
	requestAnimationFrame(Animate);
	
	padGenerate();
	
	padDraw();
	
	Ball();
	
	Control();

}

function padGenerate(){
	
	if(landMark <= 0){

		landMark = canvas.width;
		padAlt = ( padAlt ? 0 : 1 );
		
		isDown = true;
		
		for(let i = 0; i < 30; i++){
		
			padY[i][padAlt] = Math.random()*canvas.height - padHeight;
			padX[i][padAlt] = Math.random()*canvas.width + canvas.width;
		
		}
		
	}
	landMark = landMark - Speed;
	return;
}

function padStart(){
	
	for(let j = 0; j < 2; j++){
	
		for(let i = 0; i < 30; i++){
		
			padY[i][j] = Math.random()*canvas.height - padHeight;
			padX[i][j] = Math.random()*canvas.width + canvas.width*j + canvas.width;
			
		}
	
	}
	return;
}

function padDraw(){
	
	cxt.clearRect(0, 0, canvas.width, canvas.height);
	cxt.fillStyle = "blue";
	
	for(let j = 0; j < 2; j++){
	
		for(let i = 0; i < 30; i++){
			
			padX[i][j] = padX[i][j] - Speed;
			cxt.fillRect(padX[i][j], padY[i][j], padWidth, padHeight);
			
		}
	
	}
	return;
}

function Ball(){
	
	cxt.beginPath();
	cxt.arc(ballX, ballY, ballRad, 0, Math.PI * 2, false);
	cxt.fillStyle = "red";
	cxt.fill();
	cxt.stroke();
	
	if(isStart){
	
		ballX = ballX - Speed;
	
	}
	
	Bounce();
	
}

function Bounce(){
	
	if(ballSpeed > -1*22){
	
		ballSpeed = ballSpeed - acc;
	
	}
	
	if(isDown == false){
		
		ballY = ballY - ballSpeed;
		
	}
	
	for(let j = 0; j < 2; j++){
	
		for(let i = 0; i < 30; i++){
			
			if( (ballX>=padX[i][j]) && (ballX<=padX[i][j]+padWidth) && (ballY+ballRad<=padY[i][j]+22) && (ballY+ballRad>=padY[i][j]) ){
				
				ballSpeed = 22;
				ballY = padY[i][j] - ballRad;
				isDown = true;
				return;
				
			}
			
		}
	
	}
	
}

function Control(){
	
	if(Up){
		
		isDown = false;
		isStart = true;
		
	}
	if(Lf && !isDown){
		
		ballX = ballX - sideSpeed;
		
	}
	if(Rt && !isDown){
		
		ballX = ballX + sideSpeed;
		
	}
	
}

Animate();
