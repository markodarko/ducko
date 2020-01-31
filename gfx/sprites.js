class Animation{
  constructor(frames=2,speed=30){
	this.frame = 0;
	this.maxFrame = frames;
	this.speed = speed;
	this.time = 0;

  }
  updateFrame(){
	if (this.speed <= 0) return;
	if (this.time > this.speed) {
	  this.time = 0;
	  this.frame = (this.frame+1)%this.maxFrame;
	}else this.time++
  };
}

class Sprite{
  constructor(img){
	this.img = img;
  }

  drawImg(x=0,y=0,color=['black','red'],frame=GAME.getFrame()){
	this.img[frame].forEach(block => {
		ctx.fillStyle = color[block[4]]
		ctx.fillRect(block[0]+x,block[1]+y,block[2],block[3])
	}) 
  };
}

const SPRITES = {

player	:new Sprite(IMAGES.player),
wall	:new Sprite(IMAGES.wall),
spikeUP	:new Sprite(IMAGES.spikeUP),
spikeDWN:new Sprite(IMAGES.spikeDWN),
spikeR	:new Sprite(IMAGES.spikeR),
spikeL	:new Sprite(IMAGES.spikeL),
zombie	:new Sprite(IMAGES.zombie),
knight	:new Sprite(IMAGES.knight),
goblin	:new Sprite(IMAGES.goblin),
exit    :new Sprite(IMAGES.exit)
}
