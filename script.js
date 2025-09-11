const [dayInput, monthInput, yearInput] = document.querySelectorAll(".input-wrapper input");
const arrowIcon = document.querySelector(".arrow-icon");
const [yearResultEl, monthResultEl, dayResultEl] = document.querySelectorAll(".result .value");
const [dayErrorMsgEl, monthErrorMsgEl, yearErrorMsgEl] =
	document.querySelectorAll(".error-message");
const [dayWrapper, monthWrapper, yearWrapper] = document.querySelectorAll(".input-wrapper");

let dayInputValue = 0;
let monthInputValue = 0;
let yearInputValue = 0;

let isInputValuesValid = false;

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

const calculateAge = (birthDateString) => {
	const today = new Date();
	const birthDate = new Date(birthDateString);

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

const isValidDate = (day, month, year) => {
	const date = new Date(year, month - 1, day);
	return date.getFullYear() === +year && date.getMonth() === month - 1 && date.getDate() === +day;
};

const setError = (wrapper, msgEl, message = "") => {
	wrapper.classList.add("error");
	msgEl.textContent = message;
	isInputValuesValid = false;
};

const clearError = (wrapper, msgEl) => {
	wrapper.classList.remove("error");
	msgEl.textContent = "";
	isInputValuesValid = true;
};

const validation = () => {
	const day = +dayInput.value;
	const month = +monthInput.value;
	const year = +yearInput.value;

	const currentYear = new Date().getFullYear();

	// Day check
	if (!dayInput.value) {
		setError(dayWrapper, dayErrorMsgEl, "This field is required");
	} else if (day < 1 || day > 31) {
		setError(dayWrapper, dayErrorMsgEl, "Must be a valid day");
	} else {
		clearError(dayWrapper, dayErrorMsgEl);
	}

	// Month check
	if (!monthInput.value) {
		setError(monthWrapper, monthErrorMsgEl, "This field is required");
	} else if (month < 1 || month > 12) {
		setError(monthWrapper, monthErrorMsgEl, "Must be a valid month");
	} else {
		clearError(monthWrapper, monthErrorMsgEl);
	}

	// Year check
	if (!yearInput.value) {
		setError(yearWrapper, yearErrorMsgEl, "This field is required");
	} else if (yearInput.value.length !== 4 || year <= 0) {
		setError(yearWrapper, yearErrorMsgEl, "Must be a valid year");
	} else if (year > currentYear) {
		setError(yearWrapper, yearErrorMsgEl, "Must be in the past");
	} else {
		clearError(yearWrapper, yearErrorMsgEl);
	}
};

arrowIcon.addEventListener("click", () => {
	validation();

	if (isInputValuesValid) {
		const { years, months, days } = calculateAge(
			`${yearInputValue}-${monthInputValue}-${dayInputValue}`
		);

		if (!isValidDate(dayInputValue, monthInputValue, yearInputValue)) {
			setError(dayWrapper, dayErrorMsgEl, "Must be a valid date");
			setError(monthWrapper, monthErrorMsgEl);
			setError(yearWrapper, yearErrorMsgEl);
			displayResults("--", "--", "--");
		} else {
			clearError(dayWrapper, dayErrorMsgEl);
			clearError(monthWrapper, monthErrorMsgEl);
			clearError(yearWrapper, yearErrorMsgEl);
			displayResults(years, months, days);
		}
	} else {
		displayResults("--", "--", "--");
	}
});
