const MAX_ENEMY = 8;

const score = document.querySelector('.score'),
	start = document.querySelector('.start'),
	gameArea = document.querySelector('.gameArea'),
	car = document.createElement('div');

car.classList.add('car');

const audio = document.createElement('embed');

audio.src = 'audio.mp3';
audio.type = 'audio/mp3';
audio.style.cssText = `position: absolute; top: 0; left: 0;`;


const keys = {
	ArrowUp: false,
	ArrowDoun: false,
	ArroeRight: false,
	ArrowLeft: false
};

const setting = {
	start: false,
	score: 0,
	speed: 3,
	traffic: 3
};

function getQuantityElements(heightElement) {
	return document.documentElement.clientHeight / heightElement + 1;
}


const startGame = () => {
	start.classList.add('hide');

	for (let i = 0; i < getQuantityElements(100); i++) {
		const line = document.createElement('div');
		line.classList.add('line');
		line.style.top = (i * 100) + 'px';
		line.y = i * 100;
		gameArea.append(line);
	}

	for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
		const enemy = document.createElement('div');
		const randomEnemy = Math.floor(Math.random() * MAX_ENEMY) + 1;
		enemy.classList.add('enemy');
		enemy.y = -100 * setting.traffic * (i + 1);
		enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
		enemy.style.top = enemy.y + 'px';
		enemy.style.background = `transparent url(./image/enemy${randomEnemy}.png) center / cover no-repeat`;
		gameArea.append(enemy);
	}

	setting.start = true;
	gameArea.append(car);
	document.body.append(audio);
	setting.x = car.offsetLeft;
	setting.y = car.offsetTop;
	requestAnimationFrame(playGame);
};

function playGame() {

	if (setting.start) {
		moveRoad();
		moveEnemy();
		if (keys.ArrowLeft && setting.x > 0) {
			setting.x -= setting.speed;
		}
		if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
			setting.x += setting.speed;
		}
		if (keys.ArrowUp && setting.y > 0) {
			setting.y -= setting.speed;
		}
		if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
			setting.y += setting.speed;
		}

		car.style.left = setting.x + 'px';
		car.style.top = setting.y + 'px';

		requestAnimationFrame(playGame);
	}
}

function startRun(event) {
	if (keys.hasOwnProperty(event.key)) {
		event.preventDefault();
		keys[event.key] = true;
	}
}

function stopRun(event) {
	event.preventDefault();
	keys[event.key] = false;
}

function moveRoad() {
	let lines = document.querySelectorAll('.line');
	lines.forEach(function (line) {
		line.y += setting.speed;
		line.style.top = line.y + 'px';

		if (line.y >= document.documentElement.clientHeight) {
			line.y = -100;
		}
	});
}

function moveEnemy() {
	let enemy = document.querySelectorAll('.enemy');
	enemy.forEach(function (item) {
		item.y += setting.speed / 2;
		item.style.top = item.y + 'px';

		if (item.y >= document.documentElement.clientHeight) {
			item.y = -100 * setting.traffic;
			item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
		}
	});
}


start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
