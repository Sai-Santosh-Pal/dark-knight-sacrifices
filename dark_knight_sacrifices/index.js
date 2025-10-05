document.addEventListener('DOMContentLoaded', () => {
  const scene1 = document.querySelector('.scene-1');
  const scene2 = document.querySelector('.scene-2');
  const scene3 = document.querySelector('.scene-3');
  const scene4 = document.querySelector('.scene-4');
  const body = document.body;

  if (!scene1 || !scene2 || !scene3 || !scene4) {
    console.error('One or more scene elements are missing from the DOM.');
    return;
  }

  setTimeout(() => {
    const train = scene1.querySelector('.train');
    if (train) train.style.display = 'none';
  }, 5700);

  let currentScene = 1;

  body.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();

      if (currentScene === 1) {
        scene1.classList.remove('fadeIn', 'fadeOut');
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
        scene3.classList.remove('fadeIn', 'fadeOut');

        scene2.classList.add('fadeOut')
        scene2.addEventListener('animationend', function handler2() {
          scene2.removeEventListener('animationend', handler2);
          scene2.style.display = 'none';

          if (scene3) {
            scene3.style.display = 'block';
            scene3.classList.add('fadeIn');
            currentScene = 3;
          } else {
            console.error('scene-3 element not found in the DOM.');
          }
        });
      } else if (currentScene === 3) {
        scene3.classList.remove('fadeIn', 'fadeOut');
        scene4.classList.remove('fadeIn', 'fadeOut')

        scene3.classList.add('fadeOut')
        scene3.addEventListener('animationend', function handler3() {
          scene3.removeEventListener('animationend', handler3);
          scene3.style.display = 'none';

          scene4.style.display = 'block';
          scene4.classList.add('fadeIn');
          currentScene = 4;
        });
      } else if (currentScene === 5) {
        const scene5 = document.querySelector('.scene-5');
        const scene6 = document.querySelector('.scene-6');

        if (!scene5 || !scene6) {
          console.error('scene-5 or scene-6 element not found in the DOM.');
          return;
        }

        scene5.classList.remove('fadeIn', 'fadeOut');
        scene6.classList.remove('fadeIn', 'fadeOut');

        scene5.classList.add('fadeOut');
        scene5.addEventListener('animationend', function handler5() {
          scene5.removeEventListener('animationend', handler5);
          scene5.style.display = 'none';

          scene6.style.display = 'block';
          scene6.classList.add('fadeIn');
          currentScene = 6;
          startScene6();
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


  // Function to initialize Scene 6
  function startScene6() {
    currentCoach = 1;
    scene6BatmanX = 50;
    scene6BatmanY = 50;
    bombsCarrying = [];
    bombsPlaced = 0;
    bombs.forEach(bomb => {
      bomb.picked = false;
      bomb.placed = false;
    });
    updateScene6BatmanPosition();
    updateScene6Bombs();
    updateCoachIndicator();
  }

  // Scene 6 logic for Batman to pick and place bombs (Hunter Assassin style)
  let currentCoach = 1; // 1 for first coach, 2 for last coach
  let scene6BatmanX = 50; // pixels from left
  let scene6BatmanY = 50; // pixels from bottom
  let bombs = [
    { x: 200, y: 300, picked: false, placed: false },
    { x: 500, y: 400, picked: false, placed: false },
    { x: 350, y: 200, picked: false, placed: false },
  ];
  let bombsCarrying = [];
  let bombsPlaced = 0;

  function updateScene6BatmanPosition() {
    const batman = currentCoach === 1 
      ? document.getElementById('batman-scene6')
      : document.getElementById('batman-scene6-coach2');
    if (batman) {
      batman.style.left = scene6BatmanX + 'px';
      batman.style.bottom = scene6BatmanY + 'px';
    }
  }

  function updateScene6Bombs() {
    bombs.forEach((bomb, index) => {
      const bombElement = document.getElementById(`bomb-${index}`);
      if (bombElement) {
        if (bomb.picked || bomb.placed) {
          bombElement.style.display = 'none';
        } else {
          bombElement.style.display = 'block';
          bombElement.style.left = bomb.x + 'px';
          bombElement.style.bottom = bomb.y + 'px';
        }
      }
    });
    
    // Update UI
    const bombCounter = document.getElementById('bomb-counter');
    if (bombCounter) {
      bombCounter.textContent = `Bombs Placed: ${bombsPlaced}/3`;
    }
  }

  function updateCoachIndicator() {
    const indicator = document.getElementById('coach-indicator');
    if (indicator) {
      indicator.textContent = `Coach ${currentCoach}/2`;
    }
  }

  function handleScene6Keys(e) {
    if (currentScene !== 6) return;

    // Movement logic (Hunter Assassin style - smaller movements)
    const moveSpeed = 15;
    if (e.key === 'w' || e.key === 'W') {
      scene6BatmanY = Math.min(window.innerHeight - 120, scene6BatmanY + moveSpeed);
    } else if (e.key === 's' || e.key === 'S') {
      scene6BatmanY = Math.max(20, scene6BatmanY - moveSpeed);
    } else if (e.key === 'a' || e.key === 'A') {
      scene6BatmanX = Math.max(20, scene6BatmanX - moveSpeed);
    } else if (e.key === 'd' || e.key === 'D') {
      scene6BatmanX = Math.min(window.innerWidth - 100, scene6BatmanX + moveSpeed);
    }

    // Pick bomb (only in coach 1)
    if ((e.key === 'p' || e.key === 'P') && currentCoach === 1) {
      bombs.forEach((bomb, index) => {
        if (!bomb.picked && !bomb.placed) {
          const distance = Math.sqrt(
            Math.pow(scene6BatmanX - bomb.x, 2) + 
            Math.pow(scene6BatmanY - bomb.y, 2)
          );
          if (distance < 60) {
            bomb.picked = true;
            bombsCarrying.push(index);
          }
        }
      });
    }

    // Place bomb (only in coach 2 and in drop zone)
    if ((e.key === 'e' || e.key === 'E') && currentCoach === 2 && bombsCarrying.length > 0) {
      // Check if Batman is in the drop zone (right side of coach 2)
      const dropZoneX = window.innerWidth * 0.7;
      const dropZoneY = window.innerHeight * 0.2;
      const dropZoneWidth = window.innerWidth * 0.2;
      const dropZoneHeight = window.innerHeight * 0.3;
      
      if (scene6BatmanX >= dropZoneX && scene6BatmanX <= dropZoneX + dropZoneWidth &&
          scene6BatmanY >= dropZoneY && scene6BatmanY <= dropZoneY + dropZoneHeight) {
        const bombIndex = bombsCarrying.pop();
        bombs[bombIndex].placed = true;
        bombsPlaced++;
        
        if (bombsPlaced === 3) {
          setTimeout(() => {
            alert('Mission Complete! All bombs placed!');
          }, 500);
        }
      }
    }

    // Switch coach with TAB
    if (e.key === 'Tab') {
      e.preventDefault();
      switchCoach();
    }

    updateScene6BatmanPosition();
    updateScene6Bombs();
  }

  function switchCoach() {
    const coach1 = document.querySelector('.coach-1');
    const coach2 = document.querySelector('.coach-2');

    if (currentCoach === 1) {
      coach1.style.display = 'none';
      coach2.style.display = 'block';
      currentCoach = 2;
      // Reset Batman position when switching
      scene6BatmanX = 50;
      scene6BatmanY = 50;
    } else {
      coach2.style.display = 'none';
      coach1.style.display = 'block';
      currentCoach = 1;
      // Reset Batman position when switching
      scene6BatmanX = 50;
      scene6BatmanY = 50;
    }
    
    updateCoachIndicator();
    updateScene6BatmanPosition();
    updateScene6Bombs();
  }

  document.addEventListener('keydown', handleScene6Keys);
});