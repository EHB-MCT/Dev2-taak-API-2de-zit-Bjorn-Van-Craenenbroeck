document.addEventListener("DOMContentLoaded", () => {
	const quiz = new Quiz();
	quiz.fetchQuestions();

	document.getElementById("filter").addEventListener("input", (e) => {
		quiz.filterQuestions(e.target.value);
	});

	document.getElementById("sort-button").addEventListener("click", () => {
		trivia.sortQuestions();
	});
});

class Quiz {
	constructor() {
		this.questions = [];
		this.filteredQuestions = [];
	}

	async fetchQuestions() {
		try {
			const response = await fetch("https://opentdb.com/api.php?amount=10");
			const data = await response.json();
			this.questions = data.results;
			this.filteredQuestions = this.questions;
			this.displayQuestions();
		} catch (error) {
			console.error("Error fetching questions:", error);
		}
	}

	displayQuestions() {
		const questionsList = document.getElementById("questions-list");
		questionsList.innerHTML = "";
		this.filteredQuestions.forEach((question) => {
			const li = document.createElement("li");
			li.innerHTML = `
                <strong>Category:</strong> ${question.category} <br>
                <strong>Difficulty:</strong> ${question.difficulty} <br>
                <strong>Question:</strong> ${question.question}
            `;
			questionsList.appendChild(li);
		});
	}

	filterQuestions(keyword) {
		this.filteredQuestions = this.questions.filter((question) =>
			question.category.toLowerCase().includes(keyword.toLowerCase())
		);
		this.displayQuestions();
	}

	sortQuestions() {
		const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
		this.filteredQuestions.sort(
			(a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
		);
		this.displayQuestions();
	}
}
