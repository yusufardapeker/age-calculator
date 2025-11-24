const [dayInput, monthInput, yearInput] = document.querySelectorAll(".input-wrapper input");
const calculateAgeButton = document.querySelector(".calculate-age-button");
const [yearResultEl, monthResultEl, dayResultEl] = document.querySelectorAll(".date-result .value");
const [dayErrorMsgEl, monthErrorMsgEl, yearErrorMsgEl] =
	document.querySelectorAll(".error-message");
const inputWrapperElements = document.querySelectorAll(".input-wrapper");

const [dayWrapper, monthWrapper, yearWrapper] = inputWrapperElements;
const resultElements = document.querySelectorAll(".date-result");
const birthdayMessageEl = document.querySelector(".birthday-message");

let dayInputValue = 0;
let monthInputValue = 0;
let yearInputValue = 0;

let hasInputError = null;

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

const resetResults = () => {
	yearResultEl.textContent = "--";
	monthResultEl.textContent = "--";
	dayResultEl.textContent = "--";
};

const isValidDate = (day, month, year) => {
	const date = new Date(year, month - 1, day);
	return date.getFullYear() === +year && date.getMonth() === month - 1 && date.getDate() === +day;
};

const setError = (wrapper, errorMsgEl, errorMessage = "") => {
	wrapper.classList.add("error");
	errorMsgEl.textContent = errorMessage;
};

const clearError = (wrapper, errorMsgEl) => {
	wrapper.classList.remove("error");
	errorMsgEl.textContent = "";
};

const setValidDateError = () => {
	inputWrapperElements.forEach((element) => element.classList.add("error"));
	dayErrorMsgEl.textContent = "Must be a valid date";
};

const clearValidDateError = () => {
	inputWrapperElements.forEach((element) => element.classList.remove("error"));
};

const setBirthday = (years) => {
	const yearsOldValueEl = document.querySelector(".years-old-value");

	resultElements.forEach((result) => result.classList.add("hide"));
	birthdayMessageEl.classList.add("show");
	yearsOldValueEl.textContent = years;
};

const validation = () => {
	const day = +dayInput.value;
	const month = +monthInput.value;
	const year = +yearInput.value;

	const currentYear = new Date().getFullYear();

	if (!dayInput.value) {
		setError(dayWrapper, dayErrorMsgEl, "This field is required");
	} else if (day < 1 || day > 31) {
		setError(dayWrapper, dayErrorMsgEl, "Must be a valid day");
	} else {
		clearError(dayWrapper, dayErrorMsgEl);
	}

	if (!monthInput.value) {
		setError(monthWrapper, monthErrorMsgEl, "This field is required");
	} else if (month < 1 || month > 12) {
		setError(monthWrapper, monthErrorMsgEl, "Must be a valid month");
	} else {
		clearError(monthWrapper, monthErrorMsgEl);
	}

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

calculateAgeButton.addEventListener("click", (e) => {
	e.preventDefault();

	validation();

	hasInputError = [...inputWrapperElements].some((element) => element.classList.contains("error"));

	if (hasInputError) {
		birthdayMessageEl.classList.remove("show");
		resultElements.forEach((result) => result.classList.remove("hide"));

		resetResults();

		return;
	}

	const { years, months, days } = calculateAge(
		`${yearInputValue}-${monthInputValue}-${dayInputValue}`
	);

	if (!isValidDate(dayInputValue, monthInputValue, yearInputValue)) {
		setValidDateError();
		resetResults();
	} else {
		const isBirthday = days === 0 && months === 0;

		if (isBirthday) {
			setBirthday(years);
		} else {
			birthdayMessageEl.classList.remove("show");
			resultElements.forEach((result) => result.classList.remove("hide"));
		}

		clearValidDateError();
		displayResults(years, months, days);
	}
});
