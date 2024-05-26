const dayInput = document.querySelector("input#day");
const monthInput = document.querySelector("input#month");
const yearInput = document.querySelector("input#year");

const inputsWrapper = document.querySelectorAll('[class*="-input-wrapper"]');
const errorElements = document.querySelectorAll(".error-message");

const displayYear = document.querySelector("span.year-value");
const displayMonth = document.querySelector("span.month-value");
const displayDay = document.querySelector("span.day-value");

const button = document.querySelector(".arrow-icon");

let dayInputValue = 0;
let monthInputValue = 0;
let yearInputValue = 0;

dayInput.addEventListener("input", (e) => {
	dayInputValue = e.target.value;

	e.target.value.length === 2 ? monthInput.focus() : "";
});

monthInput.addEventListener("input", (e) => {
	monthInputValue = e.target.value;

	e.target.value.length === 2 ? yearInput.focus() : "";
});

yearInput.addEventListener("input", (e) => {
	yearInputValue = e.target.value;
});

const now = new Date();
let currentYear = now.getFullYear();
let currentMonth = now.getMonth();
let currentDay = now.getDate();

const calculateAge = () => {
	const dob = new Date(`${yearInputValue}-${monthInputValue}-${dayInputValue}`);

	let dobYear = dob.getFullYear();
	let dobMonth = dob.getMonth();
	let dobDay = dob.getDate();

	let yearAge = currentYear - dobYear;
	let monthAge = currentMonth - dobMonth;
	let dayAge = currentDay - dobDay;

	if (dobMonth >= currentMonth) {
		yearAge--;
		monthAge = 12 + currentMonth - dobMonth;
	}

	if (dobDay >= currentDay) {
		monthAge--;
		dayAge = 31 + currentDay - dobDay;
	}

	if (monthAge < 0) {
		monthAge = 11;
		yearAge--;
	} else if (monthAge === 12) {
		monthAge = 0;
		yearAge++;
	}

	displayYear.textContent = yearAge;
	displayMonth.textContent = monthAge;
	displayDay.textContent = dayAge;
};

const inputs = [dayInput, monthInput, yearInput];

const dayWrapper = inputsWrapper[0];
const dayErrorMsg = errorElements[0];

const monthWrapper = inputsWrapper[1];
const monthErrorMsg = errorElements[1];

const yearWrapper = inputsWrapper[2];
const yearErrorMsg = errorElements[2];

const validaton = () => {
	inputs.forEach((input, index, array) => {
		let day = array[0];
		let month = array[1];
		let year = array[2];

		if (input.value === "") {
			inputsWrapper[index].classList.add("error");
			errorElements[index].textContent = "This field is required";
		}
		if (day.value === "") {
			dayWrapper.classList.add("error");
			dayErrorMsg.textContent = "This field is required";
		} else if (day.value.length === 2 && +day.value > 0 && +day.value <= 31) {
			dayWrapper.classList.remove("error");
			dayErrorMsg.textContent = "";
		} else {
			dayWrapper.classList.add("error");
			dayErrorMsg.textContent = "Must be a valid day";
		}

		if (month.value === "") {
			monthWrapper.classList.add("error");
			monthErrorMsg.textContent = "This field is required";
		} else if (month.value.length === 2 && +month.value > 0 && +month.value <= 12) {
			monthWrapper.classList.remove("error");
			monthErrorMsg.textContent = "";
		} else {
			monthWrapper.classList.add("error");
			monthErrorMsg.textContent = "Must be a valid month";
		}

		if (year.value === "") {
			yearWrapper.classList.add("error");
			yearErrorMsg.textContent = "This field is required";
		} else if (year.value.length !== 4 || +year.value < 0) {
			yearWrapper.classList.add("error");
			yearErrorMsg.textContent = "Must be a valid year";
		} else if (+year.value > currentYear) {
			yearWrapper.classList.add("error");
			yearErrorMsg.textContent = "Must be in the past";
		} else {
			yearWrapper.classList.remove("error");
			yearErrorMsg.textContent = "";
		}
	});

	// return true;
};

button.addEventListener("click", () => {
	validaton();

	inputsWrapper.forEach((wrapperEl, index, array) => {
		if (
			!array[0].classList.value.includes("error") &&
			!array[1].classList.value.includes("error") &&
			!array[2].classList.value.includes("error")
		) {
			calculateAge();
		}
	});
});
