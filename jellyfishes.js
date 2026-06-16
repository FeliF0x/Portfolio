// Width and height
var w = window.innerWidth;
var h = window.innerHeight;


// Mouse position
var mousePos;
var mouseDown;
var oldMousePos = false;
var clientX;
var clientY;

// Vec2
var xs;
var xy;
var vec2 = function( p1, p2 ) {
	xs = 0;
	ys = 0;
	xs = p2.x - p1.x;
	xs = xs * xs;
	ys = p2.y - p1.y;
	ys = ys * ys;
	return Math.sqrt( xs + ys );
}
var angle = function( pos ) {
	return Math.atan2(pos.oy - pos.y, pos.ox - pos.x);
}

// Percent
var _ = function(num) {
	return w/100*num;
}

model = {};

// Random spawn position
var m_pos = function() {
	 return {
	 	x: Math.random()*w,
	 	y: h+_(2)
	 }
}
var m_temp_pos = {};
model.pos = function() {
	m_temp_pos = m_pos();
	return {
		x: m_temp_pos.x,
		y: m_temp_pos.y,
		ix: m_temp_pos.x,
		iy: m_temp_pos.y,
		ox: m_temp_pos.x,
		oy: m_temp_pos.y
	}
}

// Shapes

var m_j_i, m_j_i_t, m_j_pos;
model.jellyfish = function() {
	o.push({
		type: 'jellyfish',
		pos: model.pos(),
		size: Math.floor(Math.random()*_(0.5))+_(1.5),
		res: 6,
		speed: 0.5 + (Math.random()*0.5),
        baseSpeed: 0.5 + (Math.random()*0.5),
		speedX: Math.random()-0.5,
		rgb: {
			r: 55+Math.floor(Math.random()*50),
			g: 55+Math.floor(Math.random()*200),
			b: 255
		}
	});
}

var i_u;
var update = function() {
	for (i_u = 0; i_u < o.length; i_u++) {
		update[o[i_u].type](o[i_u]);
	}
}
update.jellyfish = function(obj) {
	obj.pos.ox = obj.pos.x;
	obj.pos.oy = obj.pos.y;
    //obj.speed = obj.baseSpeed + Math.sin(t * 0.1) * 0.05;
	obj.pos.y += (Math.cos(t*obj.speed)*obj.speed)-(obj.speed*2);
	obj.angle = angle(obj.pos)-(Math.PI/2);
	if (obj.pos.y < -100) {
		var tempO = [];
		for (var i = 0; i < o.length; i++) {
			if (o[i] != obj) {
				tempO.push(o[i]);
			}
		}
		o = tempO;
	}
}

var i_r;
var render = function() {
	//c.clearRect(0, 0, canvas.width, canvas.height);
	c.beginPath();
	c.rect(0, 0, canvas.width, canvas.height);
	c.fillStyle = 'rgba(10,10,40,0.75)';
	c.fill();
	for (i_r = 0; i_r < o.length; i_r++) {
		if (o[i_r].live == false) {
			o.splice(i_r,1);
		}
	}
	for (i_r = 0; i_r < o.length; i_r++) {
		render[o[i_r].type](o[i_r]);
	}
	
}

var jellyfishResolution = 2;
render.jellyfish = function(obj) {
	c.translate(obj.pos.x, obj.pos.y);
	c.rotate(obj.angle);
	// Head
	c.beginPath();
	
	c.moveTo(
		- Math.cos(0)*(obj.size)*(2.5+Math.cos(t*obj.speed+(Math.PI/5)))/4,
		0
	);
	for (var p = 0; p <= obj.res; p++) {
		c.lineTo(
			- Math.cos(Math.PI/obj.res*p)*(obj.size)*(2.5/obj.speed+Math.cos(t*obj.speed+(Math.PI/5)))/4,
			- Math.sin(Math.PI/obj.res*p)*obj.size+(Math.sin(Math.PI/obj.res*p)*Math.cos(t*obj.speed)*(obj.size*(obj.speed/2.75)))
		);
	}
	
	c.fillStyle = 'rgba('+obj.rgb.r+','+obj.rgb.g+','+obj.rgb.b+','+Math.max(Math.sin(t*obj.speed-(Math.PI/4))*obj.speed,0.2)+')';
	c.fill();
	// Tail
	c.beginPath();
	
	c.moveTo(
		-Math.cos(0)*(obj.size/6)*(2.6+Math.cos(t*obj.speed-(Math.PI/5)))/2,
		0
	);
	for (var p = 0; p <= (obj.res); p++) {
		c.lineTo(
			- Math.cos(Math.PI/(obj.res)*p)*(obj.size/6)*(2.6/obj.speed+Math.cos(t*obj.speed-(Math.PI/5)))/2,
			Math.max(Math.sin(Math.PI/(obj.res)*p)*obj.size-(Math.sin(Math.PI/(obj.res)*p)*Math.cos(t*obj.speed-(Math.PI/5))*(obj.size/1.2*obj.speed)),0)
		);
	}
	c.fillStyle = 'rgba('+obj.rgb.r+','+obj.rgb.g+','+obj.rgb.b+','+Math.max(Math.cos(t*obj.speed+(Math.PI/4))/2*obj.speed,0.2)+')';
	c.fill();
	c.setTransform(1, 0, 0, 1, 0, 0);
}

var mousemove = function(e) {
 		
 	
}

var resize = function() {
	//w = window.innerWidth;
	//h = window.innerHeight;
	//canvas.width = w;
	//canvas.height = h;
}

// Event listeners
 window.addEventListener('resize', function() {
	resize();
});
document.body.addEventListener('mouseup', function() {
 	mouseDown = false;
 	for (var i = 0; i < 3; i ++) {
 		model.jellyfish();
 	}
 	
});
document.body.addEventListener('mousedown', function() {
 	mouseDown = true;
});
document.body.addEventListener('mousemove', mousemove);


// Canvas
var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
canvas.width = w;
canvas.height = h;
var t = 0;
var _t = Math.PI/60;

// Game objects
o = [];

// Game loop
var fps = 60;
var interval;
var loop = function() {
	t += _t;
	update();
	render();
}

var jellySpawnTimeInterval = 500;
var jellySpawnTime;
/*
var spawnJellyfishes = function() {
	model.jellyfish();
	jellySpawnTime =  Math.floor(Math.random()*jellySpawnTimeInterval);
	setTimeout(function() {
		spawnJellyfishes();
	},Math.random()*jellySpawnTime);
	jellySpawnTimeInterval -= 100;
	jellySpawnTimeInterval = Math.max(jellySpawnTimeInterval,200);
	if (jellySpawnTimeInterval == 200) {
		setTimeout(function() {
			jellySpawnTimeInterval = 5000;
		},10000);
	}
}
*/
function spawnJellyfishes() {
    model.jellyfish();
/*
    var delay = 1000 + Math.random() * 4000;
    setTimeout(spawnJellyfishes, delay);
    */
}


var init = function() {
	resize();
	interval = setInterval(loop,1000/fps);
    interval2 = setInterval(spawnJellyfishes, jellySpawnTimeInterval);	
}

// Init
init();