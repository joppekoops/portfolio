// Code voor hero section

const html = document.documentElement;
const hero = document.querySelector("#hero");
const canvas = document.querySelector("#hero-canvas");
const context = canvas.getContext("2d");

const frameCount = 438; // Het totaal aantal frames van de animatie
const startFrame = 120; // Het punt waarop het laden stopt en de animatie op scroll reageert

const currentFrame = index => (
	`./img/background/background-${index.toString().padStart(3, '0')}.webp`
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

images[startFrame].addEventListener('load', function() {
	if (html.scrollTop < window.innerHeight) {
		for (let i = 1; i < startFrame; i++) {
			setTimeout(() => {requestAnimationFrame(() => updateImage(i))}, i*1000/50);
		}
	}
});

// window.addEventListener('load', function() {

// 	if (html.scrollTop < window.innerHeight) {
// 		for (let i = 1; i < startFrame; i++) {
// 			setTimeout(() => {requestAnimationFrame(() => updateImage(i))}, i*1000/50);
// 		}
// 	}

// })

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

const skillsItems = document.querySelectorAll("#skills li");

const observer = new IntersectionObserver(entries => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('in-view');
		} else {
			entry.target.classList.remove('in-view');
		}
	})
},{
	threshold: .5
});

skillsItems.forEach(item => {
	observer.observe(item);
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


// Code voor video's

const videos = document.querySelectorAll('video');

videos.forEach((video) => {
	window.addEventListener("scroll", () => {
		if (video.getBoundingClientRect().top / window.innerHeight < 1 && video.getBoundingClientRect().top / window.innerHeight > 0) {
			if(video.paused){
				video.play();
			}
		}
	})
})


// Code voor formulier

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const submitButton = document.getElementById('send');
const form = document.querySelector('form');
const formStatus = document.getElementById('form-status');
const loader = document.getElementById('loader');
const endPoint = "https://script.google.com/macros/s/AKfycbwgf-742hkCqR6TFZWln8f0k3R8zY7HwYBaMc-Vnngm4ItTwZk77OC7H4clK-cwLLgKOg/exec";

submitButton.addEventListener("click", async (e) => {

	e.preventDefault();
	let formValid = true;

	if (messageInput.value == "") {
		messageInput.setCustomValidity("Vergeet je bericht niet.");
		messageInput.reportValidity();
		formValid = false;
	} else {
		messageInput.setCustomValidity("");
		messageInput.reportValidity();
	}

	if (subjectInput.value == "") {
		subjectInput.setCustomValidity("Vergeet niet een onderwerp in te vullen.");
		subjectInput.reportValidity();
		formValid = false;
	} else {
		subjectInput.setCustomValidity("");
		subjectInput.reportValidity();
	}

	if (emailInput.value == "") {
		emailInput.setCustomValidity("Vergeet niet je e-mail adres in te vullen.");
		emailInput.reportValidity();
		formValid = false;
	
	} else if (!emailInput.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
		emailInput.setCustomValidity("Vul een correct e-mail adres in");
		emailInput.reportValidity();
		formValid = false;
	
	} else {
		emailInput.setCustomValidity("");
		emailInput.reportValidity();
	}

	if (nameInput.value == "") {
		nameInput.setCustomValidity("Vergeet niet je naam in te vullen.");
		nameInput.reportValidity();
		formValid = false;
	} else {
		nameInput.setCustomValidity("");
		nameInput.reportValidity();
	}

	if(formValid) {

		submitButton.classList.add('hidden');
		loader.style.display = "inline-block";
		formStatus.className = '';

		let formData = new FormData();

		formData.append("name", nameInput.value);
		formData.append("email", emailInput.value);
		formData.append("subject", subjectInput.value);
		formData.append("message", messageInput.value);

		try {
			const response = await fetch(endPoint, {
				method: "POST",
				body: formData
			});
			
			if (response.status !== 200) {
				throw new Error('Response status for the form is not OK.');
			}

			const data = await response.json();

			if (data.result !== 'success') {
				throw new Error('Something went wrong while processing the form.');
			}
			
			displayFormSuccess('✅ Je bericht is verzonden!');
		}

		catch (err) {
			displayFormError('❗️ Er is iets mis gegaan, probeer het later opnieuw.');
			console.error(err);
		}
	}


})


const displayFormSuccess = (message) => {
	form.reset();
	formStatus.classList.add('success');
	formStatus.innerText = message;
	setTimeout(() => formStatus.className = '', 5000)
	loader.style.display = "none";
	submitButton.classList.remove("hidden");
}

const displayFormError = (message) => {
	formStatus.classList.add('error');
	formStatus.innerText = message;
	loader.style.display = "none";
	submitButton.classList.remove("hidden");
}

