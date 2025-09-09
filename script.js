const [dayInput, monthInput, yearInput] = document.querySelectorAll(".input-wrapper input");
const arrowIcon = document.querySelector(".arrow-icon");
const [yearResultEl, monthResultEl, dayResultEl] = document.querySelectorAll(".result .value");

let dayInputValue = 0;
let monthInputValue = 0;
let yearInputValue = 0;

dayInput.addEventListener("input", (e) => {
	dayInputValue = e.target.value;

	e.target.value.length === 2 && monthInput.focus();
});

monthInput.addEventListener("input", (e) => {
	monthInputValue = e.target.value;

	e.target.value.length === 2 && yearInput.focus();
});

yearInput.addEventListener("input", (e) => {
	yearInputValue = e.target.value;
});

const calculateAge = (birthDate) => {
	const today = new Date();
	const birthDate = new Date(birthDate);

	let years = today.getFullYear() - birthDate.getFullYear();
	let months = today.getMonth() - birthDate.getMonth();
	let days = today.getDate() - birthDate.getDate();

	if (days < 0) {
		months--;
		const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
		days += prevMonth.getDate();
	}

	if (months < 0) {
		years--;
		months += 12;
	}

	return { years, months, days };
};

const displayResults = (years, months, days) => {
	yearResultEl.textContent = years;
	monthResultEl.textContent = months;
	dayResultEl.textContent = days;
};

arrowIcon.addEventListener("click", () => {
	const { years, months, days } = calculateAge(
		`${yearInputValue}-${monthInputValue}-${dayInputValue}`
	);

	displayResults(years, months, days);
});
