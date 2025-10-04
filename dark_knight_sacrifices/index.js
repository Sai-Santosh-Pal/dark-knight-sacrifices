
const scene1 = document.querySelector('.scene-1');
const scene2 = document.querySelector('.scene-2');
const body = document.body;

// setTimeout(() => {
//     scene1.style.animation = 'fadeOut 2s forwards';
//     console.log('fade out donee');
//     scene2.style.animation = 'fadeIn 2s forwards';
//     console.log('fade in donee');
// }, 4000);0


body.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    scene1.classList.add('fadeOut');
    console.log('fade out donee');
    scene1.addEventListener('animationend', function handler() {
      scene1.style.display = 'none';
      scene2.style.display = 'block';
      scene2.classList.add('fadeIn');
      scene1.removeEventListener('animationend', handler);
    });
  }
});