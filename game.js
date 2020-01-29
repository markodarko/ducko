class dashFX{
  constructor(){
	this.reset(0,0,0,0,0)
	
  }
  update(){
	if (this.alpha>0)this.alpha-=.2;
	}

  draw(){
	if (this.alpha <= 0)return;
	ctx.globalAlpha = this.alpha;
	ctx.fillStyle = COLORS.Dgrey;
	ctx.fillRect(this.x,this.y,this.w,this.h)
	ctx.globalAlpha = 1;
  }
  reset(x,y,w,h,alpha){
	this.x = x*SPRITE_WIDTH;
	this.y=y*SPRITE_WIDTH;
	this.w=w*SPRITE_WIDTH;
	this.h=h*SPRITE_WIDTH;
	this.alpha = alpha;
  }
}

class Actor{
  constructor(x,y){
  	this.x = x;
	this.y = y;
	}
  draw(colors){
	this.sprite.drawImg(this.x*SPRITE_WIDTH,this.y*SPRITE_WIDTH,colors);
  };
  update(){
	this.sprite.updateFrame();
  }
}

class Stopper{
	constructor(x,y){
	this.x=x,this.y=y;
  }
  draw(){
	ctx.fillStyle = COLORS.Dgrey
	ctx.fillRect(this.x*SPRITE_WIDTH+3,this.y*SPRITE_WIDTH+3,2,2)
  }
}
class Wall extends Actor{
  constructor(x,y){
	super(x,y);
	this.sprite = SPRITES.wall;
  }
  draw(){
	super.draw(Wall.colors)
  }
  static colors = [COLORS.black,COLORS.red];
}
class Hero extends Actor{
  constructor(x,y){
	super(x,y);
	this.dash = new dashFX();
	this.sprite = SPRITES.player;
	this.colors = [COLORS.Dgrey,COLORS.orange];
  }
  draw(){
	this.dash.draw()
	super.draw(this.colors)
  }
  update(){ 
	this.dash.update();
	super.update();
	//const horizontalSpeed = controller.getkeypress(RIGHT)-controller.getkeypress(LEFT)
	//const verticalSpeed = controller.getkeypress(DOWN)-controller.getkeypress(UP)
	const horizontalSpeed = (swipeControl.swipeDir == RIGHT)-(swipeControl.swipeDir == LEFT)
	const verticalSpeed = (swipeControl.swipeDir == DOWN)-(swipeControl.swipeDir == UP)
	if (horizontalSpeed) this.checkX(horizontalSpeed);
	else if(verticalSpeed) this.checkY(verticalSpeed);
	swipeControl.swipeDir = null
	
  }
  checkX(dir){
	let oldx = this.x, offset = dir < 0;
	while(this.gridCheck(this.x+dir,this.y)) {
		this.x += dir;
		if (GAME.room[this.y][this.x] == 'stopper') break;
	}
	this.dash.reset(oldx+offset,this.y,this.x-oldx,1,2)
  }
  checkY(dir){
	let oldy = this.y, offset = dir < 0;
	while(this.gridCheck(this.x,this.y+dir)){
		this.y += dir;
		if (GAME.room[this.y][this.x] == 'stopper') break;
	}

	this.dash.reset(this.x,oldy+offset,1,this.y-oldy,2)
  }
  gridCheck(x,y){
	if (GAME.room[y][x] != 'wall') return true
  }
  screenWrap(){
	if (this.y > 8) this.y = 0;
	else if (this.y < 1) this.y = 8;
	else if (this.x > 8) this.x = 0;
	else if (this.x < 1) this.x = 8;
	else return false
	return true
  }
}

class Zombie extends Actor{
  constructor(x,y){
	super(x,y);
	this.sprite = SPRITES.zombie;
	this.colors = [COLORS.Dgreen,COLORS.Lgreen]
  }
  update(){}
}

class Goblin extends Actor{
  constructor(x,y){
	super(x,y);
	this.sprite = SPRITES.goblin;
	this.colors = [COLORS.Lgreen,COLORS.green,COLORS.Dgreen,COLORS.Dgreen]
	//this.colors = [COLORS.Lgreen,COLORS.green,COLORS.black,COLORS.orange]
	//this.colors = [COLORS.Lgreen,COLORS.Lgreen,COLORS.black,COLORS.Lgreen]
  }
  update(){}
}

class GameControl{

  constructor(){
	this.scale = 5;
	this.setScale(this.scale);
	this.resetLevel();
	this.buildRoom(ROOMS[0]);
  }

  resetLevel(){
	this.room = [[],[],[],[],[],[],[],[]];
	this.actors = {
	  enemies:[],
	  walls:  [],
	  roomBG: [],
	  wallsFG:[]
	}
  }

  draw(){
	const A = this.actors;
	const OBJS = [...A.roomBG,...A.walls,...A.enemies,A.player];
	OBJS.forEach(obj => {
	  obj.draw();
	})
  }

  update(){
	this.actors.player.update()
  }
  buildRoom(map){
	const WIDTH = 8;
	for(let row = 0; row < WIDTH; row++){
	  for (let col = 0; col < WIDTH; col++){
		switch(map[row*WIDTH + col]){
		  case '1': 
			this.room[row].push('wall')
			this.actors.walls.push(new Wall(col,row))
		  break;
		  case 's':
			this.room[row].push('stopper')
			this.actors.roomBG.push(new Stopper(col,row))
		  break;
		  case 'p':
			this.actors.player = new Hero(col,row)
		  default: this.room[row].push('empty')

		}
	  }	
	}
  }
  checkScale(){
	let newSCALE = Math.floor((window.innerHeight/C_HEIGHT))
	if (newSCALE != this.scale){
	  this.setScale(newSCALE);
	}
  }
  setScale(scale){
	this.scale = scale;
	  canvas.height = C_HEIGHT * this.scale;
	  canvas.width  = C_WIDTH * this.scale;
	  ctx.scale(this.scale,this.scale)
  }
}

const ROOMS = {
  0:
	'11111111'+
	'1......1'+
	'1......1'+
	'1...p.11'+
	'11.....1'+
	'1.zs...1'+
	'1....z.1'+
	'11111111'
	,
  1:	'11111111'+
	'1......1'+
	'1....1.1'+
	'1..11111'+
	'11.....1'+
	'1p1....1'+
	'1......1'+
	'11111111'
}

function mainloop(){
//GAME.checkScale();
ctx.clearRect(0,0,canvas.width,canvas.height)
GAME.update();
GAME.draw();
requestAnimationFrame(mainloop)
}

var GAME = new GameControl()
canvas.addEventListener('touchmove', swipeControl.move)
window.visualViewport.addEventListener('resize',function(){
	GAME.setScale(5)
})

mainloop()

