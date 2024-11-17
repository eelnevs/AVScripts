let now = new Date().getHours();
var showSP = true;
var showRU = true;
const engInput = document.getElementById("hymn-eng");
const spInput = document.getElementById("hymn-sp");
const ruInput = document.getElementById("hymn-ru");
const customInput = document.getElementById("custom-text");

function getVal(obj, key) {
    if (key == 0) return ''
    let val = obj[key];
    return val == undefined ? "-" : obj[key]
}

function getKey(obj, val) {
    if (val == 0) return ''
    let key = Object.keys(obj).find((key) => obj[key] == val);
    return key == undefined ? "-" : key
}

function HymnConverter(number, eng=true) {
    if (eng) return getVal(HymnDictionary, number)
    else return getKey(HymnDictionary, number)
}

function HymnConverterR(number, eng=true) {
    if (eng) return getVal(HymnDictionaryR, number)
    else return getKey(HymnDictionaryR, number)
}

function storeHymn(eng, sp, ru) {
    let hymns = {
        E: eng,
        S: sp,
        R: ru,
    }
    localStorage.setItem("hymn", JSON.stringify(hymns));
}

function setShowSP() {
    localStorage.setItem("showSP", showSP);
    document.getElementById("sp-div").hidden = !showSP;
}

function setShowRU() {
    localStorage.setItem("showRU", showRU);
    document.getElementById("ru-div").hidden = !showRU;
}

function setCustomText(text) {
    let hymn = {
        text: text
    }
    localStorage.setItem("hymn", JSON.stringify(hymn))
}

function validate(event, max) {
    if (event.target.value > max) {
        let length = event.target.value.length;
        event.target.value = event.target.value.slice(0, length -1);
        return false;
    }
    if (event.target.value < 0) {
        event.target.value = event.target.value.replace('-', '');
    }
    return true;
}

function clearHymnInput() {
    engInput.value = '';
    spInput.value = '';
    ruInput.value = '';
    engInput['placeholder'] = '';
    spInput['placeholder'] = '';
    ruInput['placeholder'] = '';
}

engInput.addEventListener('keyup', e => {
    if (validate(e, 1360)) {
        let number = Number.parseInt(e.target.value) || 0;
        let sp = HymnConverter(number);
        let ru = HymnConverterR(number);
        storeHymn(number, sp, ru);
        spInput.value = sp;
        ruInput.value = ru;
        customInput.value = '';
        if (sp == "-") spInput['placeholder'] = '*No Spanish*';
        if (ru == "-") ruInput['placeholder'] = '*No Russian*';
        if (!sp) spInput['placeholder'] = '';
    }
});

spInput.addEventListener('keyup', e => {
    if (validate(e, 500)) {
        let number = Number.parseInt(e.target.value) || 0;
        let eng = HymnConverter(number, false);
        let ru = HymnConverter(eng);
        storeHymn(eng, number, ru);
        engInput.value = eng;
        ruInput.value = ru;
        customInput.value = '';
        showSP = true;
        setShowSP(showSP);
        if (eng == "-") engInput['placeholder'] = '*No English*';
        if (ru == "-") ruInput['placeholder'] = '*No Russian*';
        if (!eng) engInput['placeholder'] = '';
    }
});

ruInput.addEventListener('keyup', e => {
    if (validate(e, 800)) {
        let number = Number.parseInt(e.target.value) || 0;
        let eng = HymnConverterR(number, false);
        let sp = HymnConverter(eng);
        storeHymn(eng, sp, number);
        engInput.value = eng;
        spInput.value = sp;
        customInput.value = '';
        showRU = true;
        setShowRU(showRU);
        if (eng == "-") engInput['placeholder'] = '*No English*';
        if (sp == "-") spInput['placeholder'] = '*No Spanish*';
        if (!eng) engInput['placeholder'] = '';
    }
});

customInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        setCustomText(e.target.value);
        clearHymnInput();
    }
});

document.getElementById("toggle").addEventListener('click', () => {
    showSP = !showSP;
    setShowSP(showSP);
});

document.getElementById("toggleR").addEventListener('click', () => {
    showRU = !showRU;
    setShowRU(showRU);
});

document.getElementById("clear").addEventListener('click', () => {
    storeHymn('','','');
    clearHymnInput();
    customInput.value = '';
})

// initialize data
storeHymn(0,0,0);
setShowSP();
setShowRU();
