// select elements
let countSpan = document.querySelector(".count span");
let bulletsContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answers-area");
let submitBtn = document.querySelector(".submit-button");
let bullets = document.querySelector(".bullets");
let resultContainer = document.querySelector(".results");
let countDownEl = document.querySelector(".countdown");

// set Options
let currentIndex = 0;
let rightAnswers = 0;
let countDownInterval;

function getQuestions () {
	let myRequest = new XMLHttpRequest();

	myRequest.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			let questionObject = JSON.parse(this.responseText);
			let questionCount = questionObject.length;

			// create bullets + set question count
			createBullets(questionCount);

			// add Data
			addData(questionObject[currentIndex], questionCount);

			// add countdown
			countDown(10, questionCount);

			// click on submit button
			submitBtn.onclick = function () {
				// get right answer
					let rightAnswer = questionObject[currentIndex].right_answer;
				// increase index
				currentIndex++;
				// check the asnwer
				checkAnswer(rightAnswer, questionCount);

				// remove previous question
				quizArea.innerHTML = "";
				answerArea.innerHTML = "";
				addData(questionObject[currentIndex], questionCount);

				// handel bullet classes
				handleBullets();

				// add countdown
				clearInterval(countDownInterval);
				countDown(10, questionCount);

				// show results
				showResult(questionCount);
			}
		}
	}

	myRequest.open("GET", "questions.json", true);
	myRequest.send()
}

getQuestions();

function createBullets(num) {
	countSpan.innerHTML = num;

	// create bullets
	for (let i = 0; i < num; i++) {
		let bullet = document.createElement("span");
		bulletsContainer.appendChild(bullet);

		if (i === 0) {
			bullet.className = "on";
		}
	}
}

function addData(obj, count) {
	if(currentIndex < count) {
		// add h2 question
		let questionTitle = document.createElement("h2");

		// create question text
		let questionText = document.createTextNode(obj['title']);

		// append text to h2
		questionTitle.appendChild(questionText);

		// append the h2 to the quiz-area
		quizArea.appendChild(questionTitle);

		// create answers
		for (i = 1; i <= 4; i++) {
			// create main answer div
			let mainDiv = document.createElement("div");
			mainDiv.classList = "answer";

			// create radio input
			let radioInput = document.createElement("input");
			radioInput.name = "question";
			radioInput.type = "radio";
			radioInput.id = `answer_${i}`;
			radioInput.dataset.answer = obj[`answer_${i}`];

			// make first option selected
			if (i === 1) {
				radioInput.checked = true;
			}

			// create and set the label
			let label = document.createElement("label");
			label.htmlFor = `answer_${i}`;
			let labelText = document.createTextNode(obj[`answer_${i}`]);
			label.appendChild(labelText);

			// add input + label to maindiv
			mainDiv.appendChild(radioInput);
			mainDiv.appendChild(label);

			// append all divs to answer area
			answerArea.appendChild(mainDiv);
		}

	}
}

function checkAnswer(answer, count) {
	let asnwers = document.getElementsByName("question");
	let chosenAnswer;

	for (let i = 0; i < asnwers.length; i++) {
		if(asnwers[i].checked) {
			chosenAnswer = asnwers[i].dataset.answer;
		}
	}
	if (answer === chosenAnswer) {
		rightAnswers++;
	}
}

function handleBullets() {
	let bulletsSpans = document.querySelectorAll(".bullets .spans span");
	let arraysOfSpans = Array.from(bulletsSpans)

	arraysOfSpans.forEach((span, index)=>{
		if(currentIndex === index) {
			span.className = "on";
		}
	})
}

function showResult(count) {
	let Results;
	if (currentIndex === count) {
		quizArea.remove();
		answerArea.remove();
		submitBtn.remove();
		bullets.remove();

		if (rightAnswers > (count / 2) && rightAnswers < count) {
			Results = `<span class="good">Good</span>, ${rightAnswers} From ${count} are Correct.`;
		}else if (rightAnswers === count){
			Results = `<span class="perfect">Perfect</span>, All answers are Correct.`;			
		}else {
			Results = `<span class="bad">bad</span>, ${rightAnswers} From ${count} are Correct.`;
		}

		resultContainer.innerHTML = Results;
		resultContainer.style.padding = "10px";
		resultContainer.style.background = 'white';
		resultContainer.style.marginTop = '10px';
		resultContainer.style.borderRadius = '5px';
	}
}

function countDown(duration, count) {
	if (currentIndex < count) {
		let minutes, seconds;
		countDownInterval = setInterval(function () {
			minutes = parseInt(duration / 60);
			seconds = parseInt(duration % 60);

			minutes = minutes < 10 ? `0${minutes}` : minutes;
			seconds = seconds < 10 ? `0${seconds}` : seconds;

			countDownEl.innerHTML = `${minutes}:${seconds}`;

			if (--duration < 0) {
				clearInterval(countDownInterval);
				submitBtn.click();
			}

		}, 1000);
	}
}