score = 0;
cross = true;

audio = new Audio('music.mp3');
audioGO = new Audio('Game_Over.wav');

audio.play();

document.onkeydown = function (e) {
    console.log("Key code is: ", e.key)
    if (e.key == "ArrowUp") {
        monkey = document.querySelector('.monkey');
        monkey.classList.add('animationMonkey');
        setTimeout(() => {
            monkey.classList.remove('animationMonkey')
        }, 900);
    }
    if (e.key == "ArrowRight") {
        monkey = document.querySelector('.monkey')
        monkeyX = parseInt(window.getComputedStyle(monkey, null).getPropertyValue('left'));
        monkey.style.left = (monkeyX + 112) + "px";
    }
    if (e.key == "ArrowLeft") {
        monkey = document.querySelector('.monkey')
        monkeyX = parseInt(window.getComputedStyle(monkey, null).getPropertyValue('left'));
        monkey.style.left = (monkeyX - 112) + "px";
    }
}

setInterval(() => {
    monkey = document.querySelector('.monkey');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    mx = parseInt(window.getComputedStyle(monkey, null).getPropertyValue('left'));
    my = parseInt(window.getComputedStyle(monkey, null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(mx - ox);
    offsetY = Math.abs(my - oy);
    if (offsetX < 120 && offsetY < 170) {
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAni');
        audio.pause();
        audioGO.play();
    }
    else if (offsetX < 200 && cross) {
        score += 10;
        updateScore();
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }
}, 10);

function updateScore() {
    scoreCount.innerHTML = "Your Score: " + score;
}

function page_reload() {
    location = "http://127.0.0.1:5500/DinoDragon/index.html";
    location.reload();
}