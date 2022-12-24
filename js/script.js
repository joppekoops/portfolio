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

if (window.innerWidth > 800) {

	const titles = document.querySelectorAll("#hero span, #hero p");
		
	titles.forEach((title) => {

		title.style.opacity = Math.min(title.getBoundingClientRect().top / canvas.height * 4, (title.getBoundingClientRect().top * -1 + canvas.height) / canvas.height * 4);

		window.addEventListener("scroll", () => {
			title.style.opacity = Math.min(title.getBoundingClientRect().top / canvas.height * 4, (title.getBoundingClientRect().top * -1 + canvas.height) / canvas.height * 4);
		})
	});

}


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

xdFrame.style.transform = "scale(" + xdFrame.parentElement.clientWidth/375 + ")";


// Code voor formulier

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const firstValidationButton = document.getElementById('validate-1');
const secondValidationButton = document.getElementById('validate-2');
const submitButton = document.getElementById('send');
const form = document.querySelector('form');
const successMessage = document.getElementById('success-message');
const loader = document.getElementById('loader');
let formValid = true;
const endPoint = "https://script.google.com/macros/s/AKfycbyti1UHlpOxCAnHiVI-bdos9_ZKQ1-5pCanw72WIe0VpMQJpoZzHEsAOf0yqD3fTDfFtw/exec";

firstValidationButton.addEventListener("click", () => {
	if (nameInput.value == "") {
		
		formValid = false;
		nameInput.setCustomValidity("Vergeet niet je naam in te vullen.");
		nameInput.classList.add("invalid");
		nameInput.nextElementSibling.innerText = "Vergeet niet je naam in te vullen.";
	
	} else {
		
		form.style.marginLeft = "-100vw";
		nameInput.tabIndex = -1;
		firstValidationButton.tabIndex = -1;
		emailInput.tabIndex = 0;
		secondValidationButton.tabIndex = 0;
		nameInput.setCustomValidity("");
		formValid = true;
		nameInput.classList.remove("invalid");
		nameInput.nextElementSibling.innerText = "";
	
	}
})

secondValidationButton.addEventListener("click", () => {
	if (emailInput.value == "") {

		formValid = false;
		emailInput.setCustomValidity("Vergeet niet je e-mail adres in te vullen.");
		emailInput.classList.add("invalid");
		emailInput.nextElementSibling.innerText = "Vergeet niet je e-mail adres in te vullen.";
	
	} else if (!emailInput.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
		
		formValid = false;
		emailInput.setCustomValidity("Vul een correct e-mail adres in");
		emailInput.classList.add("invalid");
		emailInput.nextElementSibling.innerText = "Vul een correct e-mail adres in";
	
	} else {
		
		form.style.marginLeft = "-200vw";
		emailInput.tabIndex = -1;
		secondValidationButton.tabIndex = -1;
		subjectInput.tabIndex = 0;
		messageInput.tabIndex = 0;
		submitButton.tabIndex = 0;
		emailInput.setCustomValidity("");
		formValid = true;
		emailInput.classList.remove("invalid");
		emailInput.nextElementSibling.innerText = "";
	
	}
})

submitButton.addEventListener("click", () => {

	if (subjectInput.value == "") {
		formValid = false;
		subjectInput.setCustomValidity("Vergeet niet een onderwerp in te vullen.");
		subjectInput.classList.add("invalid");
		subjectInput.nextElementSibling.innerText = "Vergeet niet een onderwerp in te vullen.";
	} else {
		subjectInput.setCustomValidity("");
		formValid = true;
		subjectInput.classList.remove("invalid");
		subjectInput.nextElementSibling.innerText = "";
	}

	if (messageInput.value == "") {
		formValid = false;
		messageInput.setCustomValidity("Vergeet je bericht niet.");
		messageInput.classList.add("invalid");
		messageInput.nextElementSibling.innerText = "Vergeet je bericht niet.";
	} else {
		messageInput.setCustomValidity("");
		formValid = true;
		messageInput.classList.remove("invalid");
		messageInput.nextElementSibling.innerText = "";
	}

	if(formValid) {

		submitButton.style.display = "none";
		loader.style.display = "inline-block";

		let formData = new FormData();

		formData.append("name", nameInput.value);
		formData.append("email", emailInput.value);
		formData.append("subject", subjectInput.value);
		formData.append("message", messageInput.value);

		fetch(endPoint, {
			method: "POST",
			body: formData
		})
		.then((response) => {
			if (response.status == 200) {
				form.reset();
				form.style.marginLeft = "0";
				successMessage.style.display = "block";
				successMessage.innerText = "✅ Je bericht is verzonden!";
				setTimeout(() => {successMessage.style.display = "none"}, 5000)
				loader.style.display = "none";
				submitButton.style.display = "inline-block";
			} else {
				successMessage.innerText = "❗️ Er is iets mis gegaan, je kan het opnieuw proberen.";
				loader.style.display = "none";
				submitButton.style.display = "inline-block";
			}
		});
	}


})

