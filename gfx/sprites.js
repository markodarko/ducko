class Sprite{
  constructor(img,speed=30,frame=0){
	this.img = img;
	this.frame = frame;
	this.maxFrame = img.frames || 0;
	this.speed = speed;
	this.time = 0;
  }

  drawImg(x=0,y=0,color=['black','red'],frame=this.frame){
	this.img[frame].forEach(block => {
		ctx.fillStyle = color[block[4]]
		ctx.fillRect(block[0]+x,block[1]+y,block[2],block[3])
	}) 
  };

  updateFrame(){
	if (this.time >= this.speed) {
	  this.time = 0;
	  this.frame = (this.frame+1)%this.maxFrame;
	}else this.time++
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
goblin	:new Sprite(IMAGES.goblin)
}