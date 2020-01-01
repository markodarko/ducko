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


