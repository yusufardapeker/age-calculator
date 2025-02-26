const dayInput = document.querySelector("input#day");
const monthInput = document.querySelector("input#month");
const yearInput = document.querySelector("input#year");

const inputsWrapper = document.querySelectorAll('[class*="-input-wrapper"]');
const errorElements = document.querySelectorAll(".error-message");

const resultElement = document.querySelector("#result");
const displayYear = document.querySelector("span.year-value");
const displayMonth = document.querySelector("span.month-value");
const displayDay = document.querySelector("span.day-value");

const button = document.querySelector(".arrow-icon");

let dayInputValue;
let monthInputValue;
let yearInputValue;

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

	let year = currentYear - dobYear;
	let month = currentMonth - dobMonth;
	let day = currentDay - dobDay;

	if (dobMonth >= currentMonth) {
		year--;
		month = 12 + currentMonth - dobMonth;
	}

	if (dobDay >= currentDay) {
		month--;
		age = 31 + currentDay - dobDay;
	}

	if (month < 0) {
		month = 11;
		year--;
	} else if (month === 12) {
		month = 0;
		year++;
	}

	return { year, month, day, dob };
};

const displayResult = () => {
	const { year, month, day, dob } = calculateAge();

	const dobDate = dob.toString().split(" ").splice(0, 4);
	const today = now.toString().split(" ").splice(0, 4);

	const isPartyTime = dobDate.every((date, index) => date === today[index]);

	if (isPartyTime) {
		resultElement.textContent = "Party Time!";
		resultElement.style.animation = "partyTime 2s ease-in infinite alternate";
	} else {
		displayYear.textContent = year;
		displayMonth.textContent = month;
		displayDay.textContent = day;
	}
};

const [dayWrapper, monthWrapper, yearWrapper] = inputsWrapper;
const [dayErrorMsg, monthErrorMsg, yearErrorMsg] = errorElements;

const validaton = () => {
	if (dayInput.value === "") {
		dayWrapper.classList.add("error");
		dayErrorMsg.textContent = "This field is required";
	} else if (dayInput.value.length === 2 && +dayInput.value > 0 && +dayInput.value <= 31) {
		dayWrapper.classList.remove("error");
		dayErrorMsg.textContent = "";
	} else {
		dayWrapper.classList.add("error");
		dayErrorMsg.textContent = "Must be a valid day";
	}

	if (monthInput.value === "") {
		monthWrapper.classList.add("error");
		monthErrorMsg.textContent = "This field is required";
	} else if (monthInput.value.length === 2 && +monthInput.value > 0 && +monthInput.value <= 12) {
		monthWrapper.classList.remove("error");
		monthErrorMsg.textContent = "";
	} else {
		monthWrapper.classList.add("error");
		monthErrorMsg.textContent = "Must be a valid month";
	}

	if (yearInput.value === "") {
		yearWrapper.classList.add("error");
		yearErrorMsg.textContent = "This field is required";
	} else if (yearInput.value.length !== 4 || +yearInput.value < 0) {
		yearWrapper.classList.add("error");
		yearErrorMsg.textContent = "Must be a valid year";
	} else if (+yearInput.value > currentYear) {
		yearWrapper.classList.add("error");
		yearErrorMsg.textContent = "Must be in the past";
	} else {
		yearWrapper.classList.remove("error");
		yearErrorMsg.textContent = "";
	}
};

button.addEventListener("click", () => {
	validaton();

	let hasError = false;

	inputsWrapper.forEach((wrapperEl) => {
		if (wrapperEl.classList.value.includes("error")) {
			hasError = true;
		}
	});

	if (!hasError) {
		calculateAge();
		displayResult();
	}
});
