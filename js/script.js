// Code voor hero section

const html = document.documentElement;
const hero = document.querySelector("#hero");
const canvas = document.querySelector("#hero-canvas");
const context = canvas.getContext("2d");

const frameCount = 438; // Het totaal aantal frames van de animatie
const startFrame = 120; // Het punt waarop het laden stopt en de animatie op scroll reageert

const currentFrame = index => (
  `./img/background/background-${index.toString().padStart(3, '0')}.jpeg`
)

const images = [];

// Alvast alle plaatjes inladen, zodat niet onnodige requests worden gemaakt
const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    images[i] = new Image();
    images[i].src = currentFrame(i);
  }
};

preloadImages()


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Als het scherm hoger is dan het breed is, moet de animatie niet over het hele scherm
if (canvas.height > canvas.width * 0.8) {
  canvas.height = canvas.width * 0.8;
}


const updateImage = index => {
  img = images[index];

  // get the scale
  var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
  // get the top left position of the image
  var x = (canvas.width / 2) - (img.width / 2) * scale;
  var y = (canvas.height / 2) - (img.height / 2) * scale;
  context.drawImage(img, x, y, img.width * scale, img.height * scale);
}

window.addEventListener('load', function() {

  if (html.scrollTop < window.innerHeight) {
    for (let i = 1; i < startFrame; i++) {
      setTimeout(() => {requestAnimationFrame(() => updateImage(i))}, i*1000/50);
    }
  }

})

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = hero.scrollHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - startFrame - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + startFrame))
});


// Text Fade

const titles = document.querySelectorAll("#hero span, #hero p");
  
titles.forEach((title) => {

  title.style.opacity = Math.min(title.getBoundingClientRect().top / canvas.height * 4, (title.getBoundingClientRect().top * -1 + canvas.height) / canvas.height * 4);

  window.addEventListener("scroll", () => {
    title.style.opacity = Math.min(title.getBoundingClientRect().top / canvas.height * 4, (title.getBoundingClientRect().top * -1 + canvas.height) / canvas.height * 4);
  })
});


// Code voor skills section

const progressbars = document.querySelectorAll("progress");

progressbars.forEach(progressbar => {
  progressbar.initialvalue = progressbar.value;
  progressbar.value = 0;

  window.addEventListener("scroll", () => {
    if (progressbar.getBoundingClientRect().top < window.innerHeight*3/4) {
      progressbar.value = progressbar.initialvalue;
    } else {
      progressbar.value = 0;
    }
  });
});


// Code voor xd prototype

const xdFrame = document.querySelector('#adobe-xd-frame');

window.addEventListener("scroll", () => {
  if (xdFrame.getBoundingClientRect().top / window.innerHeight < 1 && xdFrame.getBoundingClientRect().top / window.innerHeight > 0) {
    if (xdFrame.dataset.src) {
      xdFrame.src = xdFrame.dataset.src;
      delete xdFrame.dataset.src;
    }
  }
})

