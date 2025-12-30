// default values
var showSP = true;
var showOldSP = false;
var showRU = true;
// text inputs
const engInput = document.getElementById("hymn-eng");
const spInput = document.getElementById("hymn-sp");
const ruInput = document.getElementById("hymn-ru");
const customInput = document.getElementById("custom-text");

function getVal(obj, key) {
	if (key == 0) return "";
	let val = obj[key];
	return val == undefined ? "-" : obj[key];
}

function getKey(obj, val) {
	if (val == 0) return "";
	let key = Object.keys(obj).find((key) => obj[key] == val);
	return key == undefined ? "-" : key;
}

function HymnConverter(number, numberIsEng = true) {
	if (numberIsEng) return getVal(HymnDictionary, number);
	else return getKey(HymnDictionary, number);
}

function HymnConverterOld(number, numberIsEng = true) {
	if (numberIsEng) return getVal(HymnDictionaryOldSp, number);
	else return getKey(HymnDictionaryOldSp, number);
}

function HymnConverterR(number, numberIsEng = true) {
	if (numberIsEng) return getVal(HymnDictionaryR, number);
	else return getKey(HymnDictionaryR, number);
}

function storeHymn(eng, sp, ru, oldSp) {
	let hymns = {
		E: eng,
		S: sp,
		OS: oldSp,
		R: ru,
	};
	localStorage.setItem("hymn", JSON.stringify(hymns));
}

function setShowSP() {
	localStorage.setItem("showSP", showSP);
	document.getElementById("sp-div").disabled = !showSP;
}

function setShowOldSP() {
	localStorage.setItem("showOldSP", showOldSP);
}

function setShowRU() {
	localStorage.setItem("showRU", showRU);
	document.getElementById("ru-div").disabled = !showRU;
}

function setCustomText(text) {
	let hymn = {
		text: text,
	};
	localStorage.setItem("hymn", JSON.stringify(hymn));
}

function validate(event, max) {
	if (event.target.value > max) {
		let length = event.target.value.length;
		event.target.value = event.target.value.slice(0, length - 1);
		return false;
	}
	if (event.target.value < 0) {
		event.target.value = event.target.value.replace("-", "");
	}
	return true;
}

function clearHymnInput() {
	engInput.value = "";
	spInput.value = "";
	ruInput.value = "";
	engInput["placeholder"] = "";
	spInput["placeholder"] = "";
	ruInput["placeholder"] = "";
}

engInput.addEventListener("keyup", (e) => {
	if (validate(e, 1360)) {
		let number = Number.parseInt(e.target.value) || 0;
		let sp = HymnConverter(number);
		let oldSp = HymnConverterOld(number);
		let ru = HymnConverterR(number);
		storeHymn(number, sp, ru, oldSp);
		spInput.value = sp;
		ruInput.value = ru;
		customInput.value = "";
		if (sp == "-") spInput["placeholder"] = "*No Spanish*";
		if (ru == "-") ruInput["placeholder"] = "*No Russian*";
		if (!sp) spInput["placeholder"] = "";
		if (!ru) ruInput["placeholder"] = "";
	}
});

spInput.addEventListener("keyup", (e) => {
	if (validate(e, 910)) {
		let number = Number.parseInt(e.target.value) || 0;
		let eng = HymnConverter(number, false);
		let oldSp = HymnConverterOld(eng);
		let ru = HymnConverter(eng);
		storeHymn(eng, number, ru, oldSp);
		engInput.value = eng;
		ruInput.value = ru;
		customInput.value = "";
		showSP = true;
		setShowSP();
		if (eng == "-") engInput["placeholder"] = "*No English*";
		if (ru == "-") ruInput["placeholder"] = "*No Russian*";
		if (!eng) engInput["placeholder"] = "";
		if (!ru) ruInput["placeholder"] = "";
	}
});

ruInput.addEventListener("keyup", (e) => {
	if (validate(e, 800)) {
		let number = Number.parseInt(e.target.value) || 0;
		let eng = HymnConverterR(number, false);
		let oldSp = HymnConverterOld(eng);
		let sp = HymnConverter(eng);
		storeHymn(eng, sp, number, oldSp);
		engInput.value = eng;
		spInput.value = sp;
		customInput.value = "";
		showRU = true;
		setShowRU();
		if (eng == "-") engInput["placeholder"] = "*No English*";
		if (sp == "-") spInput["placeholder"] = "*No Spanish*";
		if (!eng) engInput["placeholder"] = "";
		if (!ru) ruInput["placeholder"] = "";
	}
});

customInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		setCustomText(e.target.value);
		clearHymnInput();
	}
});

document.getElementById("switch-sp").addEventListener("click", () => {
	showSP = document.getElementById("toggle-sp").checked;
	setShowSP();
});

document.getElementById("switch-ru").addEventListener("click", () => {
	showRU = document.getElementById("toggle-ru").checked;
	setShowRU();
});

document.getElementById("old-sp-checkbox").addEventListener("click", () => {
	showOldSP = document.getElementById("old-sp-checkbox").checked;
	setShowOldSP();
});

var clearBtns = document.getElementsByClassName("clear-btn");
for (let btn of clearBtns) {
	btn.addEventListener("click", () => {
		storeHymn(0, 0, 0, 0);
		clearHymnInput();
		customInput.value = "";
	});
}

// initialize data
storeHymn(0, 0, 0, 0);
setShowSP();
setShowOldSP();
setShowRU();

var oldSpCheckbox = document.getElementById("old-sp-checkbox");
oldSpCheckbox.checked = showOldSP;
var SpToggle = document.getElementById("toggle-sp");
SpToggle.checked = showSP;
var RuToggle = document.getElementById("toggle-ru");
RuToggle.checked = showRU;
