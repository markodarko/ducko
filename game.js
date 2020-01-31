class Stopper{
	constructor(x,y){
	this.x=x,this.y=y;
  }
  draw(){
	ctx.fillStyle = COLORS.Dgrey
	ctx.fillRect(this.x*SPRITE_WIDTH+3,this.y*SPRITE_WIDTH+3,2,2)
  }
}

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
  constructor(x,y,sprite = null){
  	this.x = x;
	this.y = y;
	this.sprite = sprite;
	this.dead = false;
	}
  draw(colors,frame){
	this.sprite.drawImg(this.x*SPRITE_WIDTH,this.y*SPRITE_WIDTH,colors,frame);
  };
  die(){
	this.dead = true;
  }
}

class Wall extends Actor{
  constructor(x,y,frame = 0){
	super(x,y,SPRITES.wall);
	this.frame = frame;
  }
  draw(){
	super.draw(Wall.colors,this.frame)
  }
  static colors = [COLORS.black,COLORS.red];
}

class Exit extends Actor{
  constructor(x,y,destination = 1){
	super(x,y,SPRITES.exit)
	this.colors = [COLORS.Dgrey,COLORS.red,COLORS.black]
	this.nextRoom = destination;
  }
  draw(){
	super.draw(this.colors,0)
  }
  update(){
	const P = GAME.getPlayer();
	if (this.x == P.x && this.y == P.y) GAME.roomCheck();
  }
}

class Hero extends Actor{
  constructor(x,y){
	super(x,y,SPRITES.player);
	this.dash = new dashFX();
	this.setColors();
	this.powerup = false;
  }
  draw(){
	this.dash.draw()
	super.draw(this.colors)
  }
  update(){ 
	this.powerCheck();
	this.dash.update();
	//const horizontalSpeed = controller.getkeypress(RIGHT)-controller.getkeypress(LEFT)
	//const verticalSpeed = controller.getkeypress(DOWN)-controller.getkeypress(UP)
	const horizontalSpeed = (swipeControl.swipeDir == RIGHT)-(swipeControl.swipeDir == LEFT)
	const verticalSpeed = (swipeControl.swipeDir == DOWN)-(swipeControl.swipeDir == UP)
	if (horizontalSpeed) this.checkX(horizontalSpeed);
	else if(verticalSpeed) this.checkY(verticalSpeed);
	swipeControl.swipeDir = null
	
  }
  powerCheck(){
	if (!this.powerup) return;
	if (GAME.getTime()%5 == 0) this.colors.push(this.colors.shift());
  }
  checkX(dir){
	let oldx = this.x, offset = dir < 0;
	while(this.moveCheck(this.x+dir,this.y)) {
		this.x += dir;
		if (GAME.room[this.y][this.x] == 'stopper') break;
	}
	if (oldx != this.x)
	this.dash.reset(oldx+offset,this.y,this.x-oldx,1,2)
  }
  checkY(dir){
	let oldy = this.y, offset = dir < 0;
	while(this.moveCheck(this.x,this.y+dir)){
		this.y += dir;
		if (GAME.room[this.y][this.x] == 'stopper') break;
	}
	if (oldy != this.y)
	this.dash.reset(this.x,oldy+offset,1,this.y-oldy,2)
  }
  moveCheck(x,y){
	if (GAME.room[y][x] != 'wall') return true
  }
  screenWrap(){
  }
  setColors(){
	this.colors = [COLORS.Dgrey,COLORS.orange,COLORS.white,COLORS.cyan];
  }
}

class Zombie extends Actor{
  constructor(x,y){
	super(x,y,SPRITES.zombie);
	this.colors = [COLORS.Dgreen,COLORS.Lgreen]
  }
  update(){}
}

class Goblin extends Actor{
  constructor(x,y){
	super(x,y,SPRITES.goblin);
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
	this.globalAnim = new Animation()
	this.buildRoom(ROOMS[0]);
	this.currentRoom = 0;
  }
  roomCheck(){
	if(ROOMS[this.currentRoom+1]!=undefined){
	this.resetLevel();
	this.currentRoom++;
	this.buildRoom(ROOMS[this.currentRoom])
	}
  }
  resetLevel(){
	this.room = [[],[],[],[],[],[],[],[]];
	this.actors = {
	  enemies:[],
	  roomBG: [],
	  walls:  [],
	  wallsFG:[],
	  roomFG:[]
	}
  }

  draw(){
	const A = this.actors;
	const OBJS = [...A.roomBG,...A.walls,...A.wallsFG,...A.roomFG,...A.enemies,A.player];
	OBJS.forEach(obj => {
	  obj.draw();
	})
  }

  update(){
	this.globalAnim.updateFrame();
	const A = this.actors;
	const OBJS = [A.player,...A.roomFG];
	OBJS.forEach(obj => {
	  obj.update();
	})
  }
  getFrame(){
	return this.globalAnim.frame;
  }
  getTime(){
	return this.globalAnim.time;
  }
  getPlayer(){
	return this.actors.player;
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
		  case 'E':
			this.room[row].push('exit')
			this.actors.roomFG.push(new Exit(col,row))
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
	  ctx.scale(scale,scale)
  }
}

const ROOMS = {
  0:
	'11111111'+
	'1.....E1'+
	'1......1'+
	'1...p.11'+
	'11.....1'+
	'1.zs...1'+
	'1E...z.1'+
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

