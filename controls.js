controller = (function(){

var keyheld = [];
var keypressed = [];

var public={
	press: 		function(e){
			e.preventDefault();
			let c = e.keyCode
			if (keypressed[c] == 1){keypressed[c]=0}
			else if(keyheld[c] != 1){keypressed[c]=keyheld[c]= 1}
						
			},
	release: 	function(e){keyheld[e.keyCode] = keypressed[e.keyCode] = 0},
	getkey: 	function(code){return 1==keyheld[code]},
	getkeypress: 	function(code){if (1==keypressed[code]){keypressed[code]=0;return 1}return 0},
	
}
return public

})()

window.addEventListener('keydown',controller.press)
window.addEventListener('keyup',controller.release)

var swipeControl = {
  swipeDir:	null,
  coord:	{x0:null,y0:null},
  time:		null,
  press: 	function(e){
		  let c = swipeControl;
		  c.coord.x0 = e.touches[0].clientX;
		  c.coord.y0 = e.touches[0].clientY;
		  c.time = new Date().getTime();
		},
  release:	function(e){
		  let c = swipeControl; 
		  let x = e.changedTouches[0].clientX,
		      y = e.changedTouches[0].clientY,
		      t = new Date().getTime()-c.time;
		  if (t<500){
		  	if      (x-c.coord.x0 >  100) c.swipeDir = 39;
			else if (x-c.coord.x0 < -100) c.swipeDir = 37;
			else if (y-c.coord.y0 >  100) c.swipeDir = 40;
			else if (y-c.coord.y0 < -100) c.swipeDir = 38;
		  }  
		}
  
}

//window.addEventListener('mousedown', swipeControl.press)
//window.addEventListener('mouseup', swipeControl.release)
window.addEventListener('touchstart', swipeControl.press)
window.addEventListener('touchend', swipeControl.release)


