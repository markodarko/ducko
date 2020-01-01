class Textbox {
constructor(string,x=0,y=0,color='black', centered=1, size=5, speed=10){
	this.letters = Textbox.LETTERS;
	this.message=string;
	this.count = (this.message.length - 1) * (speed == 0);
	this.anim = {time: 0,speed: speed};
	this.setFont(size,color,centered);
	this.pos = {x:x, y:y, w:this.getStartWidth()};
	}

	getStartWidth(){
		let length = 0;
		if (this.anim.speed == 0){
		  for (let i = 0; i < this.message.length; i++){
		  	length += this.getLetterWidth(i);
		  }
		}else length = this.getLetterWidth();
		return length;
	}
	getLetterWidth(index){
		index = index || this.count;
		return this.letters[this.message[index]][0].length * this.font.pxsize + this.font.gap;
	}
	centerOffset(){
	  return Math.floor(this.pos.w/2)*this.font.centered
	}

	setFont(size, color, centered){
	  this.font = {	
			pxsize: size, 
			gap: Math.floor(size/2) || 1, 
			color: color, 
			centered:centered,
			height:this.letters.height * size
			};
	}

	draw(){	  
	  this.makeWordBubble();
	  this.writeMessage();
	  this.updateTime();
	}
		
	updateTime(){
	  if (this.anim.speed == 0) return; 
	  if(this.anim.time == this.anim.speed) {
	    this.anim.time = 0;
	    if (++this.count == this.message.length) {this.anim.speed = 0;this.count--;return}
	    this.pos.w += this.getLetterWidth();
	  }else this.anim.time++;
	}

	
	makeWordBubble(){
	  ctx.fillStyle = 'white'
	  let 	margin = this.font.pxsize*2,
		x2 = this.pos.x,
		x = this.pos.x - this.centerOffset(),
		height = this.font.height,
		width = this.pos.w;
		
	  ctx.fillRect(x-margin,this.pos.y-margin, width + margin*2 , height + margin*2)
	  ctx.fillRect(x2,this.pos.y + height + margin, margin, margin)
	  ctx.fillRect(x2+margin,this.pos.y + height + margin, margin, margin*2)
	}  

	writeMessage(){
		ctx.fillStyle = this.font.color;
		let 	textLength = 0, letter;
		
		for(let i = 0 ; i <= this.count; i++){
			letter = this.letters[this.message[i]]
			if (letter != undefined){
			this.writeletter(this.pos.x + textLength - this.centerOffset() , letter)	
			textLength += letter[0].length * this.font.pxsize + this.font.gap
			}
		}
	}

	writeletter(x,letter){
		let s = this.font.pxsize 
		for (let i = 0; i < letter.length; i++){
			let row = letter[i]
		for (let j = 0 ; j < row.length ; j++){
			if (row[j] == 1)
			ctx.fillRect(x + j*s ,this.pos.y + i * s, s, s)
			
			}
		}
	}

static LETTERS = 
	{
	height: 6,

	' ':[
	'...',
	'...',
	'...',
	'...',
	'...'
	],
	A:[
	'.1.',
	'1.1',
	'111',
	'1.1',
	'1.1'
	],
	a:[
	'....',
	'....',
	'111.',
	'1.1.',
	'11.1'
	],
	B:[
	'11.',
	'1.1',
	'111',
	'1.1',
	'111'
	],
	b:[
	'1..',
	'1..',
	'111',
	'1.1',
	'111'
	],
	C:[
	'.11',
	'1..',
	'1..',
	'1..',
	'111'
	],
	c:[
	'...',
	'...',
	'.11',
	'1..',
	'111'
	],
	D:[
	'11.',
	'1.1',
	'1.1',
	'1.1',
	'11.'
	],
	d:[
	'..1',
	'..1',
	'111',
	'1.1',
	'111'
	],
	E:[
	'.11',
	'1..',
	'11.',
	'1..',
	'111'
	],
	e:[
	'...',
	'.1.',
	'1.1',
	'11.',
	'111'
	],
	F:[
	'111',
	'1..',
	'11.',
	'1..',
	'1..'
	],
	f:[
	'..1',
	'.1.',
	'111',
	'.1.',
	'.1.'
	],
	G:[
	'.11.',
	'1...',
	'1.11',
	'1..1',
	'.11.'
	],
	g:[
	'...',
	'.1.',
	'1.1',
	'111',
	'..1',
	'.1.'
	],
	H:[
	'1.1',
	'1.1',
	'111',
	'1.1',
	'1.1'
	],
	h:[
	'1..',
	'1..',
	'11.',
	'1.1',
	'1.1'
	],
	I:[
	'111',
	'.1.',
	'.1.',
	'.1.',
	'111'
	],
	i:[
	'1',
	'.',
	'1',
	'1',
	'1'
	],
	J:[
	'111',
	'.1.',
	'.1.',
	'.1.',
	'1..'
	],
	j:[
	'.1',
	'..',
	'.1',
	'.1',
	'.1',
	'1.'
	],
	K:[
	'1.1',
	'1.1',
	'11.',
	'1.1',
	'1.1'
	],
	k :[
	'1..',
	'1.1',
	'11.',
	'1.1',
	'1.1'
	],
	L:[
	'1.',
	'1.',
	'1.',
	'1.',
	'11'
	],
	l:[
	'1',
	'1',
	'1',
	'1',
	'1'
	],
	M:[
	'11.11',
	'1.1.1',
	'1.1.1',
	'1...1',
	'1...1'
	],
	m:[
	'.....',
	'.....',
	'1111.',
	'1.1.1',
	'1...1'
	],
	N:[
	'11.1',
	'1.11',
	'1..1',
	'1..1',
	'1..1'
	],
	n:[
	'...',
	'...',
	'11.',
	'1.1',
	'1.1'
	],
	O:[
	'.11',
	'1.1',
	'1.1',
	'1.1',
	'111'
	],
	o:[
	'...',
	'...',
	'111',
	'1.1',
	'111'
	],
	P:[
	'11.',
	'1.1',
	'111',
	'1..',
	'1..'
	],
	p:[
	'...',
	'...',
	'11.',
	'1.1',
	'111',
	'1..'
	],
	Q:[
	'.11.',
	'1..1',
	'1..1',
	'11.1',
	'.11.',
	'...1'
	],
	q:[
	'....',
	'....',
	'.11.',
	'1.1.',
	'111.',
	'..11'
	],
	R:[
	'11.',
	'1.1',
	'11.',
	'1.1',
	'1.1'
	],
	r:[
	'..',
	'..',
	'11',
	'1.',
	'1.'
	],
	S:[
	'111',
	'11.',
	'..1',
	'..1',
	'111'
	],
	s:[
	'...',
	'111',
	'11.',
	'..1',
	'111'
	],
	T:[
	'111',
	'.1.',
	'.1.',
	'.1.',
	'.1.'
	],
	t:[
	'..',
	'1.',
	'11',
	'1.',
	'.1'
	],
	U:[
	'1..1',
	'1..1',
	'1..1',
	'1..1',
	'1111'
	],
	u:[
	'...',
	'...',
	'1.1',
	'1.1',
	'111'
	],
	V:[
	'1.1',
	'1.1',
	'1.1',
	'1.1',
	'.1.'
	],
	v:[
	'...',
	'...',
	'1.1',
	'1.1',
	'.1.'
	],
	W:[
	'1...1',
	'1...1',
	'1.1.1',
	'1.1.1',
	'11.11'
	],
	w:[
	'.....',
	'.....',
	'1.1.1',
	'1.1.1',
	'1111.'
	],
	X:[
	'1.1',
	'1.1',
	'.1.',
	'1.1',
	'1.1'
	],
	x:[
	'...',
	'...',
	'1.1',
	'.1.',
	'1.1'
	],
	Y:[
	'1.1',
	'1.1',
	'.1.',
	'.1.',
	'.1.'
	],
	y:[
	'...',
	'...',
	'1.1',
	'111',
	'..1',
	'.1.'
	],
	Z:[
	'111',
	'..1',
	'.1.',
	'1..',
	'111'
	],
	z:[
	'..',
	'11',
	'.1',
	'1.',
	'11'
	],
	1:[
	'.1',
	'11',
	'.1',
	'.1',
	'.1'
	],
	2:[
	'111',
	'..1',
	'111',
	'1..',
	'111'
	],
	3:[
	'111',
	'..1',
	'.11',
	'..1',
	'111'
	],
	4:[
	'1.1',
	'1.1',
	'111',
	'..1',
	'..1'
	],
	5:[
	'111',
	'1..',
	'111',
	'..1',
	'111'
	],
	6:[
	'.1.',
	'1..',
	'111',
	'1.1',
	'111'
	],
	7:[
	'111',
	'..1',
	'.1.',
	'.1.',
	'.1.'
	],
	8:[
	'111',
	'1.1',
	'111',
	'1.1',
	'111'
	],
	9:[
	'111',
	'1.1',
	'111',
	'..1',
	'..1'
	],
	0:[
	'111',
	'1.1',
	'1.1',
	'1.1',
	'111'
	],
	'(':[
	'.1',
	'1.',
	'1.',
	'1.',
	'.1'
	],
	')':[
	'1.',
	'.1',
	'.1',
	'.1',
	'1.'
	],
	'!':[
	'11',
	'11',
	'1.',
	'..',
	'1.'
	],
	'?':[
	'111',
	'..1',
	'.1.',
	'...',
	'.1.'
	],
	':':[
	'.',
	'1',
	'.',
	'.',
	'1'
	],
	'.':[
	'.',
	'.',
	'.',
	'.',
	'1'
	],
	',':[
	'.',
	'.',
	'.',
	'.',
	'1',
	'1'
	],
	'\"':[
	'1.1',
	'1.1',
	'...',
	'...',
	'...'
	],
	'\'':[
	'11',
	'.1',
	'..',
	'..',
	'..'
	],
	'&':[
	'.1...',
	'1.1..',
	'.1..1',
	'1..1.',
	'.11.1.'
	]
	};
		
}
