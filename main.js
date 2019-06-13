let canvas = document.querySelector('canvas');
let context = canvas.getContext("2d");

let backGround = new Image();
backGround.src = "img/Кремль.png";

let person = new Image();
person.src = "img/Герой.png";

let person2 = new Image();
person2.src = "img/Герой2-с-ак.png";

let earth = new Image();
earth.src = "img/Земля.png";

let platform = new Image();
platform.src = "img/Платформа.png";

let obama = new Image();
obama.src = "img/Обама.png";

let automaton = new Image();
automaton.src = "img/АК-47.png";

let bullet = new Image();
bullet.src = "img/Пуля.png";

let shot = new Image();
shot.src = "img/Выстрел.png";

let money = new Image();
money.src = "img/Деньги.png";

let americanFlag = new Image();
americanFlag.src = "img/Американский-флаг.png";

let audio1 = new Audio();
audio1.src = "audio/За россию 1.mp3";

let audio2 = new Audio();
audio2.src = "audio/За россию 2.mp3";

let audio3 = new Audio();
audio3.src = "audio/Ебаный ты козел.mp3";

let audio4 = new Audio();
audio4.src = "audio/Ебать буду.mp3";

let audio5 = new Audio();
audio5.src = "audio/Залупаешься блять.mp3";

let audio6 = new Audio();
audio6.src = "audio/Ты живешь на континенте.mp3";

let audio7 = new Audio();
audio7.src = "audio/Хуль ты сюда лезишь.mp3";

let audio8 = new Audio();
audio8.src = "audio/Чтоб жили мы ровно.mp3";

let audio9 = new Audio();
audio9.src = "audio/У меня есть хороший блять человек.mp3";

let audio10 = new Audio();
audio10.src = "audio/Обамы.mp3";

let gunAudio = [audio4, audio8];
let killAudio = [audio1, audio2, audio3, audio5, audio6, audio7];

let checkAudio = false;
let scroll = 0;
let scrollNum = 0;
const platformArr = [];
const enemyArr = [];
const shotArr = [];
const bulletArr = [];

function random(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

class newElem {
	constructor(x, y, width, heigth, speed, jump) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.jump = jump;
		this.width = width;
		this.heigth = heigth;
		this.check = 0;
	}

	fall() {
		this.check = 1;
				let animateBottom = setInterval(() => {
					if(this.y >= land) {
						clearInterval(animateBottom);
						this.check = 0;
						checkAudio = false;
					} else {
						for(let i = 0; i < enemyArr.length; i++) {
        	            if(checkAudio === false && personPos.y + personPos.heigth  >= enemyArr[i].y && 
			    personPos.x <= enemyArr[i].x + enemyArr[i].width
			    && personPos.x + personPos.width >= enemyArr[i].x) {
        	              	enemyArr.splice(i, 1);
        	                killAudio[random(0, killAudio.length - 1)].play();
        	                checkAudio = true;
        	              }
                        }
						this.y += 0.5;
					}
				})

			}


	plusPos() {
		if(event.keyCode === 39) {
			this.x += this.speed
			//скролл
        if(personPos.x + personPos.width >= backGroundPos.width / 2) {
        	scroll = 5;
        	scrollNum += scroll;
        	enemyArr.forEach((obamaElem) => {
        	obamaElem.x -= scroll;
        	obamaElem.startPos -= scroll;
        	obamaElem.endPos -= scroll;
        	obamaElem.priority -= scroll;
        });

        platformArr.forEach((platformElem) => platformElem.x -= scroll);
        personPos.x -= scroll;
        automatonPos.x -= scroll;
        moneyPos.x -= scroll;
        americanFlagPos.x -= scroll;
        }
		};
		if(event.keyCode === 37) this.x -= this.speed;
		if(event.keyCode === 38 && this.check === 0) {
			let score = 0;
			let animateTop = setInterval(() => {
				this.check = 1;
				if(score < this.jump) {
				score += 0.6;
				this.y -= 0.6;
			} else {
				clearInterval(animateTop);
				let animateBottom = setInterval(() => {
					if(this.y >= land) {
						clearInterval(animateBottom);
						this.check = 0;
					} else {
						this.y += 0.5;
					}
				})
			}
			});
		};
	}
}

class enemyElem extends newElem {
	constructor(x, y, width, heigth, speed, endPos) {
		super(x, y, width, heigth, speed);
		this.endPos = endPos;
		this.startPos = x;
		this.priority = this.startPos;

		let moveInterval = setInterval(() => {
			if(this.x <= this.startPos) this.priority = this.endPos;
			if(this.x >= this.endPos) this.priority = this.startPos;

			if(this.priority <= this.startPos) this.x -= this.speed;
			if(this.priority >= this.endPos) this.x += this.speed;
		})
	}
}


let backGroundPos = new newElem(0, 0, 900, 500)
let personPos = new newElem(0, 350, 70, 105, 5, 200);
let earthPos = new newElem(0, personPos.y + personPos.heigth - 20, backGroundPos.width, 
	backGroundPos.heigth - (personPos.y + personPos.heigth - 20));

platformArr.push(new newElem(100, 280, 200, 50));
platformArr.push(new newElem(400, 300, 200, 50));

enemyArr.push(new enemyElem(300, 350, 70, 105, 0.6, 600));

platformArr.push(new newElem(900, 300, 200, 50));
platformArr.push(new newElem(1200, 200, 200, 50));
let automatonPos = new newElem(1250, 100, 120, 120);
enemyArr.push(new enemyElem(1000, 350, 70, 105, 0.7, 1300));
enemyArr.push(new enemyElem(1300, 350, 70, 105, 0.7, 1700));
platformArr.push(new newElem(1700, 300, 200, 50));
platformArr.push(new newElem(1900, 250, 200, 50));
let moneyPos = new newElem(2300, 320, 130, 160);
let person2Pos = new newElem(-70, personPos.y, personPos.width, personPos.heigth);
platformArr.push(new newElem(2200, 250, 200, 50));
platformArr.push(new newElem(2500, 250, 200, 50));
platformArr.push(new newElem(2800, 250, 200, 50));
enemyArr.push(new enemyElem(1700, 350, 70, 105, 0.7, 2000));
enemyArr.push(new enemyElem(1800, 350, 70, 105, 0.7, 2100));
enemyArr.push(new enemyElem(1900, 350, 70, 105, 0.7, 2200));
enemyArr.push(new enemyElem(2100, 350, 70, 105, 0.7, 2500));
enemyArr.push(new enemyElem(2200, 350, 70, 105, 0.7, 2800));
let americanFlagPos = new newElem(3700, 50, 300, 400);

let land = 350;

let numberPlatform;

document.addEventListener("keydown", function(event) {
	    if(event.keyCode === 32 && person.src === "file:///C:/Users/%D0%9E%D0%BB%D0%B5%D0%B3/Desktop/JavaScript/%D0%9F%D0%BE%D0%B1%D0%B5%D0%B9%20%D0%BF%D0%B5%D0%BD%D0%B4%D0%BE%D1%81%D0%B0/img/%D0%93%D0%B5%D1%80%D0%BE%D0%B9-%D1%81-%D0%B0%D0%BA.png") {
	    	shotArr.push(new newElem(personPos.x + 50, personPos.y + 45, 50, 50));
	    	bulletArr.pop();
	    	if(bulletArr.length === 0) {
	    		person.src = "img/Герой.png";
	    	}
	    }
		personPos.plusPos();
		platformArr.forEach((platformElem) => {
			if(land !== 350 && (personPos.x + 19 > numberPlatform.x + numberPlatform.width
							|| personPos.x + personPos.width - 19 < numberPlatform.x)) {
			land = 350;
		    personPos.fall();
		}
		});

		if(personPos.x <= automatonPos.x + automatonPos.width
			    && personPos.x + personPos.width >= automatonPos.x &&
			    automatonPos.y + automatonPos.heigth >= personPos.y && 
			    automatonPos.y <= personPos.y + personPos.heigth) {
			person.src = "img/Герой-с-ак.png"
		    gunAudio[random(0, gunAudio.length - 1)].play();
		    bulletArr.push(new newElem(800, 10, 70, 20));
		    bulletArr.push(new newElem(800, 25, 70, 20));
		    bulletArr.push(new newElem(800, 40, 70, 20));
		    bulletArr.push(new newElem(800, 55, 70, 20));
		    bulletArr.push(new newElem(800, 70, 70, 20));
		    automatonPos.y = undefined;
		}

		if(personPos.x <= moneyPos.x + moneyPos.width
			    && personPos.x + personPos.width >= moneyPos.x &&
			    moneyPos.y + moneyPos.heigth >= personPos.y && 
			    moneyPos.y <= personPos.y + personPos.heigth) {
			moneyPos.y = undefined;
			enemyArr.forEach((obamaElem) => obamaElem.speed = 0);
			setTimeout(() => audio9.play(),
				1500)
			setTimeout(() => {
			shotArr.push(new newElem(person2Pos.x + 50, person2Pos.y + 45, 50, 50));
			setTimeout(() => shotArr.push(new newElem(person2Pos.x + 50, person2Pos.y + 45, 50, 50)),
				1000)
			setTimeout(() => {
				shotArr.push(new newElem(person2Pos.x + 50, person2Pos.y + 45, 50, 50))
				person2Pos.x = 20;
			},2000)
			setTimeout(() => shotArr.push(new newElem(person2Pos.x + 50, person2Pos.y + 45, 50, 50)),
				3000)
			setTimeout(() => shotArr.push(new newElem(person2Pos.x + 50, person2Pos.y + 45, 50, 50)),
				4000)
			setTimeout(() => shotArr.push(new newElem(person2Pos.x + 50, person2Pos.y + 45, 50, 50)),
				5000)
			setTimeout(() => audio10.play(),
				5500)
			setTimeout(() => person2Pos.y = undefined,
				13000)
			}, 11000)
		}

		if(personPos.x <= americanFlagPos.x + automatonPos.width
			&& personPos.x + personPos.width >= americanFlagPos.x) {
			americanFlag.src = "img/Российский-флаг.png";
		    alert("Вы спасли Россию от пендосов!!!");
		}

});

function draw() {
	context.drawImage(backGround, backGroundPos.x, backGroundPos.y, 
		backGroundPos.width, backGroundPos.heigth);
	context.drawImage(earth, earthPos.x, earthPos.y, earthPos.width, earthPos.heigth);
	context.drawImage(person, personPos.x, personPos.y, personPos.width, personPos.heigth);
	context.drawImage(person2, person2Pos.x, person2Pos.y, person2Pos.width, person2Pos.heigth);
	context.drawImage(americanFlag, americanFlagPos.x, americanFlagPos.y, 
		americanFlagPos.width, americanFlagPos.heigth);
	platformArr.forEach((platformElem) => context.drawImage(platform, platformElem.x, 
		platformElem.y, platformElem.width, platformElem.heigth));
	context.drawImage(money, moneyPos.x, moneyPos.y, 
		moneyPos.width, moneyPos.heigth);
	enemyArr.forEach((enemyElem) => context.drawImage(obama, enemyElem.x, 
		enemyElem.y, enemyElem.width, enemyElem.heigth));
	shotArr.forEach((shotElem) => context.drawImage(shot, shotElem.x, 
		shotElem.y, shotElem.width, shotElem.heigth));
	context.drawImage(automaton, automatonPos.x, automatonPos.y, 
		automatonPos.width, automatonPos.heigth);
	bulletArr.forEach((bulletElem) => context.drawImage(bullet, bulletElem.x, 
		bulletElem.y, bulletElem.width, bulletElem.heigth));
	

        platformArr.forEach((platformElem) => {
        	if(personPos.y + personPos.heigth  <= platformElem.y && 
			personPos.x + 19 <= platformElem.x + platformElem.width
			    && personPos.x + personPos.width - 19 >= platformElem.x) {
			land = platformElem.y - personPos.heigth;
		    numberPlatform = platformElem;
		    }
        });

        if(personPos.y <= -50) {
        	personPos.fall();
        };

        if(shotArr.length > 0) {
        	shotArr.forEach((shotElem) => {
	    		let shotInterval = setInterval(() => {
	    			shotElem.x += 3;
	    		})

	    		for(let i = 0; i < enemyArr.length; i++) {
	    			if(shotElem.y + shotElem.heigth  >= enemyArr[i].y && 
			    shotElem.x <= enemyArr[i].x + enemyArr[i].width
			    && shotElem.x + shotElem.width >= enemyArr[i].x) {
        	              	enemyArr.splice(i, 1);
        	                killAudio[random(0, killAudio.length - 1)].play();
        	                checkAudio = true;
        	                for(let i = 0; i < shotArr.length; i++) {
        	                	shotArr.splice(i, 1);
        	                }
        	              }
	    		}
	    
	    		if(shotElem.x >= backGroundPos.width) shotArr.splice(shotElem, 1);
	    	})
        }

        platformArr.forEach((platformElem) => {
        	if(personPos.y <= platformElem.y + platformElem.heigth  && 
			personPos.x + 19 <= platformElem.x + platformElem.width
			    && personPos.x + personPos.width - 19 >= platformElem.x && 
			    personPos.y >= platformElem.y) {
				personPos.fall();
		    }
        })

        //проиграл
        enemyArr.forEach((obamaElem) => {
        	if(personPos.y + personPos.heigth  >= obamaElem.y + obamaElem.heigth && 
			personPos.x <= obamaElem.x + obamaElem.width
			    && personPos.x + personPos.width >= obamaElem.x) {
        		personPos.x = undefined;
        	    enemyArr.forEach((obamaElem) => {
        	obamaElem.x += scrollNum;
        	obamaElem.startPos += scrollNum;
        	obamaElem.endPos += scrollNum;
        	obamaElem.priority += scrollNum;
        	automatonPos.x += scrollNum;
        	moneyPos.x += scrollNum;
        	americanFlagPos.x += scrollNum;
        });

        platformArr.forEach((platformElem) => platformElem.x += scrollNum);
        personPos.x = 0;
        person.src = "img/Герой.png";
        bulletArr.splice(0, bulletArr.length);
        automatonPos.y = 100;
    }
   });
        requestAnimationFrame(draw);
}


backGround.onload = draw;