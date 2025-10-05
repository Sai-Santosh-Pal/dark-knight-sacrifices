const scene1 = document.querySelector('.scene-1');
const scene2 = document.querySelector('.scene-2');
const scene3 = document.querySelector('.scene-3');
const scene4 = document.querySelector('.scene-4');
const body = document.body;
setTimeout(() => {
  const train = scene1.querySelector('.train');
  if (train) train.style.display = 'none';
}, 5700);

let currentScene = 1;

body.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    if (currentScene === 1) {
      scene1.classList.remove('fadeIn', 'fadeOut')
      scene2.classList.remove('fadeIn', 'fadeOut');
      scene1.classList.add('fadeOut')
      

      scene1.addEventListener('animationend', function handler() {
        scene1.removeEventListener('animationend', handler);
        scene1.style.display = 'none';
        scene2.style.display = 'block';
        scene2.classList.add('fadeIn');
        currentScene = 2;
      });

    } else if (currentScene === 2) {
      scene2.classList.remove('fadeIn', 'fadeOut');
      scene3.classList.remove('fadeIn', 'fadeOut')

      scene2.classList.add('fadeOut')
      scene2.addEventListener('animationend', function handler2() {
        scene2.removeEventListener('animationend', handler2);
        scene2.style.display = 'none';

        scene3.style.display = 'block';
        scene3.classList.add('fadeIn');
        currentScene = 3;
      });
    } else if (currentScene === 3) {
      scene3.classList.remove('fadeIn', 'fadeOut');
      scene4.classList.remove('fadeIn', 'fadeOut')

      scene3.classList.add('fadeOut')
      scene3.addEventListener('animationend', function handler2() {
        scene3.removeEventListener('animationend', handler2);
        scene3.style.display = 'none';

        scene4.style.display = 'block';
        scene4.classList.add('fadeIn');
        currentScene = 4;
      });
    }
}});

// Scene 4 fighting logic
let batmanX = 20; // percent
let jokerX = 60; // percent
let batmanY = 0;
let jokerY = 0;
let batmanJumping = false;
let jokerJumping = false;
let batmanState = 'stand'; // 'stand' | 'hit'
let jokerState = 'stand'; // 'stand' | 'hit'
let batmanFrame = 0;
let batmanFramesLeft = [
  'assets/assets/batman/BatmanLeft1.png',
  'assets/assets/batman/BatmanLeft2.png',
  'assets/assets/batman/BatmanLeft3.png',
  'assets/assets/batman/BatmanLeft4.png',
];
let batmanFramesRight = [
  'assets/assets/batman/BatmanRight1.png',
  'assets/assets/batman/BatmanRight2.png',
  'assets/assets/batman/BatmanRight3.png',
  'assets/assets/batman/BatmanRight4.png',
];
let batmanLastDir = 'right';
let jokerHealth = 100;
let fightFrames = [
  'assets/assets/fight/FIGHT SCENE (1).png',
  'assets/assets/fight/FIGHT SCENE (2).png',
  'assets/assets/fight/FIGHT SCENE (3).png',
  'assets/assets/fight/FIGHT SCENE (4).png',
  'assets/assets/fight/FIGHT SCENE (5).png',
  'assets/assets/fight/FIGHT SCENE (6).png',
  'assets/assets/fight/FIGHT SCENE (7).png',
  'assets/assets/fight/FIGHT SCENE (8).png',
];
let fightInProgress = false;

// Add Joker's frame-by-frame animations for movement
let jokerFrame = 0;
let jokerFramesLeft = [
  'assets/assets/joker/JokerLeft1.png',
  'assets/assets/joker/JokerLeft2.png',
  'assets/assets/joker/JokerLeft3.png',
  'assets/assets/joker/JokerLeft4.png',
];
let jokerFramesRight = [
  'assets/assets/joker/JokerRight1.png',
  'assets/assets/joker/JokerRight2.png',
  'assets/assets/joker/JokerRight3.png',
  'assets/assets/joker/JokerRight4.png',
];

function setBatmanState(state, dir) {
  batmanState = state;
  const batman = document.getElementById('batman');
  if (batman) {
    if (state === 'stand') {
      batman.src = 'assets/assets/batman/BatmanStill.png';
    } else if (state === 'move') {
      setTimeout(() => {
        if (dir === 'left') {
          batmanFrame = (batmanFrame + 1) % batmanFramesLeft.length;
          batman.src = batmanFramesLeft[batmanFrame];
        } else if (dir === 'right') {
          batmanFrame = (batmanFrame + 1) % batmanFramesRight.length;
          batman.src = batmanFramesRight[batmanFrame];
        }
      }, 500); // 1/2 second delay
    } else if (state === 'attack') {
      batman.src = 'assets/assets/batman/BatmanKick.png';
    }
  }
}

function setJokerState(state) {
  const joker = document.getElementById('joker');
  if (joker) {
    if (state === 'stand') {
      joker.src = 'assets/assets/joker/JokerStill.png';
    } else if (state === 'hit') {
      joker.src = 'assets/assets/joker/JokerHit.png';
    }
  }
}

function updateJokerHealthBar() {
  const bar = document.getElementById('joker-health-bar-inner');
  if (bar) {
    bar.style.width = Math.max(0, jokerHealth) + '%';
    if (jokerHealth > 60) bar.style.background = '#22c55e';
    else if (jokerHealth > 30) bar.style.background = '#facc15';
    else bar.style.background = '#ef4444';
  }
}

function updateFighters() {
  const batman = document.getElementById('batman');
  const joker = document.getElementById('joker');
  if (batman) {
    batman.style.left = batmanX + '%';
    batman.style.bottom = (10 + batmanY) + 'px';
    batman.style.height = '75%';
  }
  if (joker) {
    joker.style.left = jokerX + '%';
    joker.style.bottom = (10 + jokerY) + 'px';
    joker.style.height = '75%';
  }
  updateJokerHealthBar();
}

function startScene5() {
  const scene4= document.querySelector('.scene-4');
  const scene5 = document.querySelector('.scene-5');
  scene4.classList.remove('fadeIn', 'fadeOut');
  scene5.classList.remove('fadeIn', 'fadeOut')

  scene4.classList.add('fadeOut')
  scene5.style.display = 'block';
  scene5.classList.add('fadeIn');
  currentScene = 5;
}
  

function playFightAnimation() {
  fightInProgress = true;
  const batman = document.getElementById('batman');
  const joker = document.getElementById('joker');
  let frame = 0;
  let healthStart = jokerHealth;
  let healthEnd = Math.max(0, jokerHealth - 40);
  let healthStep = (healthStart - healthEnd) / fightFrames.length;
  if (joker) joker.style.display = 'none'; // Hide Joker's image
  function nextFrame() {
    if (frame < fightFrames.length) {
      if (batman) batman.src = fightFrames[frame];
      jokerHealth = Math.max(0, healthStart - healthStep * (frame + 1));
      updateJokerHealthBar();
      frame++;
      setTimeout(nextFrame, 120);
    } else {
      // End of fight animation
      if (batman) batman.src = batmanLastDir === 'left' ? batmanFramesLeft[0] : batmanFramesRight[0];
      if (joker) joker.style.display = 'block'; // Restore Joker's visibility
      fightInProgress = false;
      if (jokerHealth <= 0) {
        const bar = document.getElementById('joker-health-bar-inner');
        if (bar) bar.style.background = '#444';
        startScene5();
      }
    }
  }
  nextFrame();
}

function handleFightKeys(e) {
  if (currentScene !== 4 || fightInProgress) return;
  // Batman controls (WASD)
  if (e.key === 'a' || e.key === 'A') {
    batmanX = Math.max(0, batmanX - 2);
    setBatmanState('move', 'left');
  } else if (e.key === 'd' || e.key === 'D') {
    batmanX = Math.min(80, batmanX + 2);
    setBatmanState('move', 'right');
  } else if ((e.key === 'w' || e.key === 'W') && !batmanJumping) {
    batmanJumping = true;
    setBatmanState('stand');
    let jumpPeak = 60;
    let jumpStep = 0;
    let jumpInterval = setInterval(() => {
      if (jumpStep < 10) {
        batmanY += jumpPeak / 10;
      } else if (jumpStep < 20) {
        batmanY -= jumpPeak / 10;
      } else {
        clearInterval(jumpInterval);
        batmanY = 0;
        batmanJumping = false;
      }
      updateFighters();
      jumpStep++;
    }, 20);
  } else if (e.key === 's' || e.key === 'S') {
    playFightAnimation();
  } else if (e.key === ' ') {
    setBatmanState('attack');
    // Add logic to reduce Joker's health
  }
  updateFighters();
}
document.addEventListener('keydown', handleFightKeys);
