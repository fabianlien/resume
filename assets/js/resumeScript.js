
window.addEventListener("load", resumeScript);
window.addEventListener("resize", resumeScript);

function resumeScript() {
    const numChildren = $("#language-container").children().length;
    let needsRespacing = false
    let languageBox = document.getElementsByClassName("language-box");
    let yCordPositions = []
    let instCounter = {};


    function countRows(reset) {
        //Creates an array of the y coordinates for each language box.
        for (let n = 0; n < numChildren; ++n) {
            let langBox = languageBox[n].getBoundingClientRect();
            yCordPositions.push(langBox.y);
        }

        //Creates an object representing the amount of rows and how many elements are in each.
        yCordPositions.forEach(i => {
            if (instCounter[i]) {
                instCounter[i] += 1;
            } else {
                instCounter[i] = 1;
            }
        })
        if (reset) {
            yCordPositions = [];
            for (let key in instCounter) {
                delete instCounter[key]
            }
        }
    }
    countRows();

    //Checks if any rows have more than 2 fewer elements than the first row.
    let objLen = (Object.keys(instCounter).length)
    if (objLen > 1) {
        for (let key = 0; key < objLen; ++key) {
            if (Object.values(instCounter)[0] - Object.values(instCounter)[key] > 2) {
                needsRespacing = true
            }
        }
    }

    //Changes the margin of the elements in the first row if needs spacing is true.
    if (needsRespacing) {
        let firstRowLen = Object.values(instCounter)[0];
        for (let e = 0; e < firstRowLen; ++e) {
            languageBox[e].style.margin = "10px 30px 10px 10px";
        }

        countRows("reset");
        countRows();

        //Changes the margins on the new set of rows.
        firstRowLen = Object.values(instCounter)[0];
        for (let e = 5; e < numChildren; ++e) {
            let updatedHTML = languageBox[e].outerHTML.replace("margin: 10px 30px 10px 10px", "margin-left: min(10px)")
            languageBox[e].outerHTML = updatedHTML
        }
    }
}
