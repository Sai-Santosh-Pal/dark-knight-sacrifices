const scene1 = document.querySelector('.scene-1');
const scene2 = document.querySelector('.scene-2');
const scene3 = document.querySelector('.scene-3');
const body = document.body;

// Hide train after animation completes
setTimeout(() => {
  const train = scene1.querySelector('.train');
  if (train) train.style.display = 'none';
}, 5700);

let currentScene = 1;

body.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    // ---------- SCENE 1 → SCENE 2 ----------
    if (currentScene === 1) {
      // reset classes in case of repeated triggers
      scene1.classList.remove('fadeIn', 'fadeOut');
      scene2.classList.remove('fadeIn', 'fadeOut');

      // start fade out animation
      scene1.classList.add('fadeOut');
      console.log("Scene 1 fading out...");

      scene1.addEventListener('animationend', function handler() {
        scene1.removeEventListener('animationend', handler);
        scene1.style.display = 'none'; // hide scene 1

        // show scene 2
        scene2.style.display = 'block';
        scene2.classList.add('fadeIn');
        console.log("Scene 2 fading in...");
        currentScene = 2;
      });

    // ---------- SCENE 2 → SCENE 3 ----------
    } else if (currentScene === 2) {
      scene2.classList.remove('fadeIn', 'fadeOut');
      scene3.classList.remove('fadeIn', 'fadeOut');

      scene2.classList.add('fadeOut');
      console.log("Scene 2 fading out...");

      scene2.addEventListener('animationend', function handler2() {
        scene2.removeEventListener('animationend', handler2);
        scene2.style.display = 'none';

        scene3.style.display = 'block';
        scene3.classList.add('fadeIn');
        console.log("Scene 3 fading in...");
        currentScene = 3;
      });
    }
  }
});
