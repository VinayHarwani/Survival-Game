const startscreen = document.querySelector('.startscreen');
const playingarea = document.querySelector('.playingarea');
const gameArea = document.querySelector('.gamearea');
const score = document.querySelector('.score');
const best = document.querySelector('.best');
const preGame = document.querySelector('.pre-game');
const preGame1 = document.querySelector('.before-screen');
const preGame2 = document.querySelector('.before-screen-2');

score.innerHTML = '0';
best.innerHTML = '0';

let player = { speed: 5, start: false };
let enemyStatus = { speed: 0.65, speedIncrease: 0.05 };


let keys = { w: false, s: false, a: false, d: false }
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);



startscreen.addEventListener('click', start);

function start() {
    //console.log('started');
    player.start = true;
    playingarea.classList.remove('hide');
    startscreen.classList.add('hide');
    preGame.classList.add('hide');
    preGame1.classList.add('hide');
    preGame2.classList.add('hide');

    score.innerHTML = '0';

    const hero = document.createElement('div');
    hero.classList.add('hero');
    playingarea.appendChild(hero);

    player.x = hero.offsetLeft;
    player.y = hero.offsetTop;

    spawnEnemy(oldSpawner);

    window.requestAnimationFrame(gamePlay);
}

let oldSpawner = 5;
let newSpawner = 2 * oldSpawner;
let spawnBetween = 1;


function gamePlay() {

    // let boundings = playingarea.getBoundingClientRect();
    let hero = document.querySelector('.hero');
    if (player.start) {
        let heightOfScreen = playingarea.offsetHeight - 58;
        let widthOfScreen = playingarea.offsetWidth - 55;
        if (keys.w == true && hero.offsetTop > playingarea.offsetTop) { player.y -= player.speed }
        if (keys.s == true && hero.offsetTop < heightOfScreen) { player.y += player.speed }
        if (keys.a == true && hero.offsetLeft > playingarea.offsetLeft) { player.x -= player.speed }
        if (keys.d == true && hero.offsetLeft < widthOfScreen) { player.x += player.speed }

        hero.style.top = player.y + "px";
        hero.style.left = player.x + "px";

        if (+score.innerHTML == (oldSpawner - spawnBetween)) {

            // enemyKilled.status == false;
            spawnEnemy(newSpawner);
            spawnBetween = spawnBetween * 2;
            oldSpawner += newSpawner;
            newSpawner = newSpawner + 10;
        }
        //  else{
        //      enemyKilled.status == true;
        //  }

        window.requestAnimationFrame(gamePlay);
    }
    else {
        playingarea.classList.add('hide');
        startscreen.classList.remove('hide');
        preGame.classList.remove('hide');
        preGame1.classList.remove('hide');
        preGame2.classList.remove('hide');
        playingarea.innerHTML = "";
        oldSpawner = 5;
        newSpawner = 2 * oldSpawner;
        spawnBetween = 1;
        enemyStatus.speed = 0.65;
        if (+score.innerHTML > +best.innerHTML) {
            best.innerHTML = score.innerHTML;
        }
    }
}

function spawnEnemy(k) {
    enemyStatus.speed += enemyStatus.speedIncrease;
    for (let i = 1; i <= k; i++) {
        const enemy = document.createElement('div');

        let z = Math.floor(Math.random() * 3);
        if (z == 0) {
            enemy.classList.add('enemymax');
        }
        else if (z == 1) {
            enemy.classList.add('enemymid');
        }
        else {
            enemy.classList.add('enemylow');
        }
        enemy.classList.add('enemy');
        // enemy.style.top = (50*i + 100) + "px";
        let x = Math.floor(Math.random() * 4);

        if (x <= 1) {
            if (x == 0) {
                enemy.style.top = 0;
            }
            else {
                enemy.style.bottom = 0;
            }
            let y = Math.floor(Math.random() * 100);
            enemy.style.left = y + "vw";
        }
        else {
            if (x == 2) {
                enemy.style.left = 0;
            }
            else {
                enemy.style.right = 0;
            }
            let y = Math.floor(Math.random() * 100);
            enemy.style.top = y + "vh";
        }

        playingarea.appendChild(enemy);

        //var enemystate = true;

        isCollision(enemy);

        moveEnemy(enemy);

        enemy.addEventListener('click', function () {
            killEnemy(enemy);
        });

    }
}

function isCollision(enemy) {
    if (player.start == true && !enemy.classList.contains('hide')) {
        let hero = document.querySelector('.hero');
        let hero_cord = hero.getBoundingClientRect();
        let enemy_cord = enemy.getBoundingClientRect();

        //console.log(enemy_cord.right + " " + enemy_cord.top + " " + enemy_cord.bottom);

        if
            (enemy_cord.right >= hero_cord.right &&
            enemy_cord.right <= (hero_cord.right + 50) &&
            ((enemy_cord.top >= hero_cord.top &&
                enemy_cord.top <= (hero_cord.top + 50)) ||
                (enemy_cord.bottom >= hero_cord.bottom &&
                    enemy_cord.bottom <= (hero_cord.bottom + 50)))) {
            player.start = false;
            //console.log("collide1");
        }

        if
            (enemy_cord.left >= hero_cord.left &&
            enemy_cord.left <= (hero_cord.left + 50) &&
            ((enemy_cord.top >= hero_cord.top &&
                enemy_cord.top <= (hero_cord.top + 50)) ||
                (enemy_cord.bottom >= hero_cord.bottom &&
                    enemy_cord.bottom <= (hero_cord.bottom + 50)))) {
            player.start = false;
            //console.log("collide2");
        }

        if
            (enemy_cord.top >= hero_cord.top &&
            enemy_cord.top <= (hero_cord.top + 50) &&
            ((enemy_cord.left >= hero_cord.left &&
                enemy_cord.left <= (hero_cord.left + 50)) ||
                (enemy_cord.right >= hero_cord.right &&
                    enemy_cord.right <= (hero_cord.right + 50)))) {
            player.start = false;
        }

        if
            (enemy_cord.bottom >= hero_cord.bottom &&
            enemy_cord.bottom <= (hero_cord.bottom + 50) &&
            ((enemy_cord.left >= hero_cord.left &&
                enemy_cord.left <= (hero_cord.left + 50)) ||
                (enemy_cord.right >= hero_cord.right &&
                    enemy_cord.right <= (hero_cord.right + 50)))) {
            player.start = false;
        }

        window.requestAnimationFrame(function () {
            isCollision(enemy);
        });
    }
}

function moveEnemy(enemy) {
    //let enemy = document.querySelector('.enemy');
    if (player.start && !enemy.classList.contains('hide')) {

        let hero = document.querySelector('.hero');
        let hero_cord = hero.getBoundingClientRect();
        let enemy_cord = enemy.getBoundingClientRect();

        let dx = Math.abs((hero_cord.left + 5) - enemy_cord.left);
        let dy = Math.abs((hero_cord.top + 5) - enemy_cord.top);
        //console.log(enemy_cord.left);

        let dxp, dyp;
        if (dx < dy) {
            dxp = (dx / dy) * enemyStatus.speed;
            dyp = (enemyStatus.speed) - dxp;
        }
        else {
            dyp = (dy / dx) * enemyStatus.speed;
            dxp = (enemyStatus.speed) - dyp;
        }
        //console.log(dx);

        if (hero_cord.left > enemy_cord.left) {
            dxp += enemy_cord.left;
        }
        else {
            dxp = enemy_cord.left - dxp;
        }
        if (hero_cord.top > enemy_cord.top) {
            dyp += enemy_cord.top;
        }
        else {
            dyp = enemy_cord.top - dyp;
        }
        enemy.style.left = dxp + 'px';
        enemy.style.top = dyp + 'px';

        // enemy.addEventListener('click' , function(){
        //     killEnemy(enemy);
        // });


        window.requestAnimationFrame(function () {
            moveEnemy(enemy);
        });

    }
}

function killEnemy(enemy) {
    //  console.log('enemy');
    if (enemy.classList.contains('enemymax')) {
        enemy.classList.remove('enemymax');
        enemy.classList.add('enemymid');

    }
    else if (enemy.classList.contains('enemymid')) {
        enemy.classList.remove('enemymid');
        enemy.classList.add('enemylow');
    }
    else {
        score.innerHTML = +score.innerHTML + 1;
        enemy.classList.add('hide');
        //enemystate = false;

    }
}


function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    console.log(e.key);
    //console.log(keys);
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}
