var caretPosition;
var wrapper;

function loadWYSIWYG(containerID) {
    let template = `<div class="wysiwyg-editor">
            <div class="wysiwyg-bar wysiwyg-unselectable">

                <button class="wysiwyg-item wysiwyg-button wysiwyg-tooltip" id="bold">
                    <i class="fa fa-bold"></i>
                    <span class="wysiwyg-tooltiptext">Bold</span>
                </button>

                <button class="wysiwyg-item wysiwyg-button wysiwyg-tooltip" id="italic">
                    <i class="fa fa-italic"></i>
                    <span class="wysiwyg-tooltiptext">Italic</span>
                </button>

                <button class="wysiwyg-item wysiwyg-button wysiwyg-tooltip" id="underline">
                    <i class="fa fa-underline"></i>
                    <span class="wysiwyg-tooltiptext">Underline</span>
                </button>

                <button class="wysiwyg-item wysiwyg-button wysiwyg-tooltip" id="strikeThrough">
                    <i class="fas fa-strikethrough"></i>
                     <span class="wysiwyg-tooltiptext">Strike&nbspthrough</span>
                </button>

                <div class="wysiwyg-dropdown wysiwyg-item " id="headingsDD">
                    <div class="wysiwyg-tooltip">
                        <i class="fas fa-heading "></i>
                        <span class="wysiwyg-tooltiptext">Heading</span>
                    </div>
                    <div class="wysiwyg-dropdown-content" id="headings">
                        <h1 class="wysiwyg-item-small wysiwyg-margin-none">H1</h1>
                        <h2 class="wysiwyg-item-small wysiwyg-margin-none">H2</h2>
                        <h3 class="wysiwyg-item-small wysiwyg-margin-none">H3</h3>
                        <h4 class="wysiwyg-item-small wysiwyg-margin-none">H4</h4>
                        <h5 class="wysiwyg-item-small wysiwyg-margin-none">H5</h5>
                        <h6 class="wysiwyg-item-small wysiwyg-margin-none">H6</h6>
                    </div>
                </div>

                <div class="wysiwyg-dropdown wysiwyg-item" id="colorsDD">
                    <div class="wysiwyg-tooltip">
                        <i class="fas fa-tint" id="colorIcon"></i>
                         <span class="wysiwyg-tooltiptext">Change&nbspcolor</span>
                    </div>
                    <div class="wysiwyg-dropdown-content wysiwyg-dropdown-content3">
                        <div class="wysiwyg-switch">
                            <div class="wysiwyg-item-small wysiwyg-item-small-active wysiwyg-float-left" id="switch3"><span class="wysiwyg-switch-txt">Text</span></div>
                            <div class="wysiwyg-item-small wysiwyg-float-left" id="switch4"><span class="wysiwyg-switch-txt">Background</span></div>
                        </div>
                        <table class="wysiwyg-colors-table">
                        </table>
                        <input class="wysiwyg-input" placeholder="#Hex" id="colorHex" />
                        <button class="wysiwyg-btn wysiwyg-button" id="pickColorBtn" >Pick</button>
                    </div>
                </div>

                <div class="wysiwyg-dropdown wysiwyg-item" id="fontSizesDD">
                    <div class="wysiwyg-tooltip">
                         <i class="fas fa-font"></i> <i class="fas fa-arrows-alt-v"></i>
                        <span class="wysiwyg-tooltiptext">Change&nbspfont&nbspsize</span>
                    </div>
                    <div class="wysiwyg-dropdown-content" id="fontSizes">
                    </div>
                </div>

                <button class="wysiwyg-item wysiwyg-button wysiwyg-tooltip" id="orderedList">
                    <i class="fas fa-list-ol"></i>
                    <span class="wysiwyg-tooltiptext">Ordered&nbsplist</span>
                </button>

                <button class="wysiwyg-item wysiwyg-button wysiwyg-tooltip" id="unorderedList">
                    <i class="fas fa-list-ul"></i>
                    <span class="wysiwyg-tooltiptext">Unordered&nbsplist</span>
                </button>

                <button class="wysiwyg-item wysiwyg-button wysiwyg-tooltip" id="indent">
                    <i class="fas fa-indent"></i>
                    <span class="wysiwyg-tooltiptext">Indent</span>
                </button>

                <button class="wysiwyg-item wysiwyg-button wysiwyg-tooltip" id="outdent">
                    <i class="fas fa-outdent"></i>
                    <span class="wysiwyg-tooltiptext">Outdent</span>
                </button>

                <div class="wysiwyg-dropdown wysiwyg-item" id="insertTableDD">
                    <div class="wysiwyg-tooltip">
                        <i class="fas fa-table"></i>
                        <span class="wysiwyg-tooltiptext">Insert&nbsptable</span>
                    </div>
                    <div class="wysiwyg-dropdown-content">
                        <table id="tableContainer" onmouseleave="setWhiteBackgroundInTable()">
                        </table>
                    </div>
                </div>

                <div class="wysiwyg-dropdown wysiwyg-item" id="justifyDD">
                    <div class="wysiwyg-tooltip">
                        <i class="fas fa-align-center"></i> <i class="fas fa-caret-down"></i>
                        <span class="wysiwyg-tooltiptext">Justify</span>
                    </div>
                    <div class="wysiwyg-dropdown-content">
                        <button id="justifyCenter" class="wysiwyg-item-small wysiwyg-button"><i class="fas fa-sm fa-align-center"></i></button>
                        <button id="justifyLeft" class="wysiwyg-item-small wysiwyg-button"><i class="fas fa-sm fa-align-left"></i></button>
                        <button id="justifyRight" class="wysiwyg-item-small wysiwyg-button"><i class="fas fa-sm fa-align-right"></i></button>
                        <button id="justifyFull"  class="wysiwyg-item-small wysiwyg-button"><i class="fas fa-sm fa-align-justify"></i></button>
                    </div>
                </div>

                <div class="wysiwyg-dropdown wysiwyg-item" id="insertLinkDD">
                    <div class="wysiwyg-tooltip" >
                        <i class="fa fa-link"></i>
                        <span class="wysiwyg-tooltiptext">Insert&nbsplink</span>
                    </div>
                    <div class="wysiwyg-dropdown-content wysiwyg-dropdown-content2">
                        <input class="wysiwyg-input" placeholder="Url" id="linkUrl" />
                        <input class="wysiwyg-input" placeholder="Text" id="linkText" />
                        <button id="insertLinkBtn" class="wysiwyg-btn wysiwyg-button">Insert</button>
                    </div>
                </div>

                <button class="wysiwyg-item wysiwyg-button wysiwyg-tooltip" id="unlink">
                    <i class="fas fa-unlink"></i>
                     <span class="wysiwyg-tooltiptext">Unlink</span>
                </button>

                <div class="wysiwyg-dropdown wysiwyg-item" id="insertImageDD">
                    <div class="wysiwyg-tooltip">
                        <i class="far fa-image"></i>
                        <span class="wysiwyg-tooltiptext">Insert&nbspimage</span>
                    </div>
                    <div class="wysiwyg-dropdown-content wysiwyg-dropdown-content2">
                        <div class="wysiwyg-switch">
                            <div class="wysiwyg-item-small wysiwyg-float-left wysiwyg-tooltip wysiwyg-item-small-active" id="switch1">
                                <i class="fas fa-xs fa-upload"></i>
                                 <span class="wysiwyg-tooltiptext">via&nbspfile&nbspupload</span>
                            </div>
                            <div class="wysiwyg-item-small wysiwyg-float-left wysiwyg-tooltip" id="switch2">
                                <i class="fas fa-xs fa-link"></i>
                                 <span class="wysiwyg-tooltiptext">via&nbsplink</span>
                            </div>
                        </div>
                        <div id="imgUrl" class="wysiwyg-invisible-imageUpload">
                            <input class="wysiwyg-input" placeholder="Url" name="imgUrl" />
                            <button class="wysiwyg-btn wysiwyg-button" id="insertImage">Insert</button>
                        </div>
                        <div id="imgUpload">
                            <input class="wysiwyg-input" type="file" name="imgUploadFile" hidden/>
                            <button class="wysiwyg-img-upload wysiwyg-float-left wysiwyg-button" id="clickUploaderBtn">Choose image</button>
                        </div>
                    </div>
                </div>

                <button class="wysiwyg-item wysiwyg-button wysiwyg-tooltip" id="removeFormatBtn" ><i class="fas fa-eraser"></i><span class="wysiwyg-tooltiptext">Remove&nbspformat</span></button>
            </div>
            <div id="wysiwygInputArea" contenteditable="true" >
            </div>
        </div>`;

    if (document.getElementById(containerID) !== null) {
        wrapper = document.getElementById(containerID);
        addScript('https://use.fontawesome.com/releases/v5.0.7/js/all.js');
        document.getElementById(containerID).innerHTML = template;
        document.getElementById('wysiwygInputArea').innerHTML = '';
        document.getElementById('wysiwygInputArea').focus();
        initTableDD();
        initFontSizesDD();
        initImagesDD();
        initColorsDD();
        initLinksDD();
        initHeadingsDD();
        initBaseCommands();
        addClickListenerToDoc();
        setTooltipPosition();
        setDropdownPosition();
        addKeydownListenerTowysiwygInputArea();
    } else {
        console.log('Didnt find element with given ID: ' + id);
    }
}

function addScript(src) { //add external script
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function addScript(src, callback) {
    let script = document.createElement("script")
    script.type = "text/javascript";
    script.src = src;
    document.getElementsByTagName("head")[0].appendChild(script);
    script.onload = callback;
}

//Insert link section
function initLinksDD() {
    document.getElementById('insertLinkDD').addEventListener('click', function () {
        insertEmptyLink();
    });

    document.getElementById('insertLinkBtn').addEventListener('click', function () {
        insertLink();
    });

}

function insertEmptyLink() {
    //if there is already empty link in editor do nothing
    let empty = document.getElementsByClassName('empty-link')[0];
    if (empty !== undefined)
        return;

    document.execCommand('removeFormat', false, null);
    document.execCommand('insertHTML', false, '<a class="empty-link"> </a>');
    document.execCommand('removeFormat', false, null);
}

function removeEmptyLinks() {
    //delete all empty links
    while ((emptyLink = document.getElementsByClassName('empty-link')[0]) !== undefined) {
        emptyLink.remove();
    }
}

function insertLink() {
    let url = document.getElementById('linkUrl').value
    let urlText = document.getElementById('linkText').value
    if (url !== '' && document.getElementsByClassName('empty-link')[0] !== undefined) {
        urlText === '' ? urlText = url : urlText = urlText;
        document.getElementsByClassName('empty-link')[0].innerHTML = urlText;
        document.getElementsByClassName('empty-link')[0].setAttribute('href', url);
        document.getElementsByClassName('empty-link')[0].classList.remove('empty-link');
        document.getElementById('insertLinkDD').classList.remove('wysiwyg-dropdown-active');
    }
}
//Image upload section

function initImagesDD() {
    //files uploaded via file upload are stored on firebase
    //these function handle this
    addScript('https://www.gstatic.com/firebasejs/5.0.0/firebase-app.js', function () { //add one script after another
        addScript('https://www.gstatic.com/firebasejs/5.0.0/firebase-storage.js', function () {
            addScript('https://www.gstatic.com/firebasejs/5.0.1/firebase.js', function () {
                initializeFirebaseStorage(); //then initialize firebase
            });
        });
    });
    document.getElementById('clickUploaderBtn').addEventListener('click', function () {
        clickUploader();
    });
    document.getElementsByName('imgUploadFile')[0].addEventListener('change', function () {
        uploadToFirebase(document.getElementsByName('imgUploadFile')[0]);
    });
    //to handle file upload on your own change functions above

    document.getElementById('insertImage').addEventListener('click', function () {
        insertImage();
    });

    let switch1 = document.getElementById('switch1');
    let switch2 = document.getElementById('switch2');
    switch1.addEventListener('click', function () {
        toggleImgUploadSlot(switch1);
    });
    switch2.addEventListener('click', function () {
        toggleImgUploadSlot(switch2);
        insertEmptyImage();
    });
}

function getImgBySrc(src) { //return img with given src
    let imgs = document.getElementsByTagName('img');
    for (let i of imgs)
        if (i.getAttribute('src') === src)
            return i;
}

function clickUploader() { //click hidden file input
    document.getElementsByName('imgUploadFile')[0].click();
}

function insertEmptyImage() {
    let empty = getImgBySrc('empty-image');
    if (empty !== undefined)
        return;
    document.execCommand('removeFormat', false, null);
    document.execCommand('insertImage', false, 'empty-image');
    document.execCommand('removeFormat', false, null);
}

function removeEmptyImages() {
    while ((emptyImage = getImgBySrc('empty-image')) !== undefined) {
        emptyImage.remove();
    }
}

function insertImage() { //insert image from given url from input field
    if (document.getElementsByName('imgUrl')[0].value === '')
        return;

    getImgBySrc('empty-image').style = "width:200px";
    getImgBySrc('empty-image').setAttribute('src', document.getElementsByName('imgUrl')[0].value);

    execute('enableObjectResizing');
    document.getElementById('insertImageDD').classList.remove('wysiwyg-dropdown-active');
}

function initializeFirebaseStorage() {
    //these are parameters of example firebase account
    var config = {
        apiKey: "AIzaSyDohEKd9u943emxFh5UieFkr0vMo0NVtNY",
        authDomain: "wysiwyg-editor.firebaseapp.com",
        databaseURL: "https://wysiwyg-editor.firebaseio.com",
        projectId: "wysiwyg-editor",
        storageBucket: "wysiwyg-editor.appspot.com",
        messagingSenderId: "1020398664581"
    };
    firebase.initializeApp(config);
}

function uploadToFirebase(fileInput) {
    if (fileInput.value === '')
        return;

    const ref = firebase.storage().ref();
    const file = fileInput.files[0]
    const name = (+new Date()) + '-' + file.name;
    const metadata = {
        contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task.then((snapshot) => {
        snapshot.ref.getDownloadURL().then(function (url) {
            execute('insertImage', url);
            let img = getImgBySrc(url) //get image that was inserted by execCommand
            if (img !== undefined)
                img.style = "width:200px;";
        });
    }).catch((error) => {
        console.error(error);
    });

    document.getElementById('insertImageDD').classList.remove('wysiwyg-dropdown-active');
}

function toggleImgUploadSlot(ref) { //switch between 'url' and 'file upload' slots in 'insertImageDD' div
    if (ref.getAttribute('id') === 'switch1') {
        document.getElementById('imgUrl').classList.add('wysiwyg-invisible-imageUpload');
        document.getElementById('imgUpload').classList.remove('wysiwyg-invisible-imageUpload')
        ref.classList.add('wysiwyg-item-small-active');
        document.getElementById('switch2').classList.remove('wysiwyg-item-small-active');
    }
    if (ref.getAttribute('id') === 'switch2') {
        document.getElementById('imgUpload').classList.add('wysiwyg-invisible-imageUpload');
        document.getElementById('imgUrl').classList.remove('wysiwyg-invisible-imageUpload')
        ref.classList.add('wysiwyg-item-small-active');
        document.getElementById('switch1').classList.remove('wysiwyg-item-small-active');
    }
}

//Fonts Section
function initFontSizesDD() { //fill drop down selection with 7 values
    let tmp = document.getElementById('fontSizes');
    if (tmp === null)
        return;
    for (let i = 1; i < 8; i++) {
        let div = document.createElement('div');
        div.classList.add('wysiwyg-font-size');
        div.innerHTML = i;
        div.addEventListener('click', function () {
            changeFontSize(i);
        });
        tmp.appendChild(div);
    }
}

function changeFontSize(size) {
    for (let i of document.getElementsByClassName('wysiwyg-font-size')) {
        if (i.innerHTML == size)
            i.classList.add('wysiwyg-font-size-active');
        else
            i.classList.remove('wysiwyg-font-size-active');
    }

    document.getElementById('fontSizesDD').classList.remove('wysiwyg-dropdown-active');
    execute('fontSize', size);

}

//Table inserting Section
function initTableDD() {
    let tab = document.getElementById('tableContainer');
    if (tab === null)
        return;
    for (let i = 0; i < 5; i++) {
        let tr = document.createElement('tr');
        tr.setAttribute('id', 'tr' + i);
        for (let j = 0; j < 5; j++) {
            let td = document.createElement('td');
            td.classList.add('wysiwyg-td-custom');
            td.setAttribute('id', 'td' + i + '' + j);
            td.setAttribute('onmouseover', 'highlightTable(' + i + ',' + j + ')');
            td.addEventListener('click', function () {
                insertTable(i, j);
            });
            tr.append(td);
        }
        tab.append(tr);
    }

}

function setWhiteBackgroundInTable() { //set default background on mouse leave in 'insertTableDD'
    let tab = document.getElementById('tableContainer');
    for (let tr of tab.childNodes) {
        for (let td of tr.childNodes) {
            if (td.nodeName === 'TD')
                td.classList.remove('wysiwyg-td-custom-onhover');
        }
    }
}

function highlightTable(row, col) { //highlight table rows and cols on hover in 'insertTableDD'
    setWhiteBackgroundInTable();

    for (let i = 0; i <= row; i++) {
        for (let j = 0; j <= col; j++) {
            let td = document.getElementById('td' + i + '' + j);
            td.classList.add('wysiwyg-td-custom-onhover');
        }
    }
}

function insertTable(row, col) { //insert choosen table to editor
    let html = '<table style="border-collapse: collapse; margin:10px">'
    for (let i = 0; i <= row; i++) {
        html += "<tr>"
        for (let j = 0; j <= col; j++) {
            html += '<td style="border: 1px solid black; width:30px; height:30px"></td>';
        }
        html += "</tr>";
    }
    html += "</table>";
    execute('insertHTML', html);
    execute('insertHTML', '<br/>');
}

//Colors
function initColorsDD() {
    createColorsTable();
    document.getElementById('pickColorBtn').addEventListener('click', function () {
        pickColor();
    });
    let switch3 = document.getElementById('switch3');
    let switch4 = document.getElementById('switch4');
    switch3.addEventListener('click', function () {
        toggleColorsSlot(switch3);
    });

    switch4.addEventListener('click', function () {
        toggleColorsSlot(switch4);
    });
}

function createColorsTable() {
    let colors = [
                ['#c70039', '#ff5733', '#ff8d1a', '#ffc300', '#2B1CFF'],
                ['#eddd53', '#add45c', '#57c785', '#00baad', '#10FF55'],
                ['#2a7b9b', '#3d3d6b', '#511849', '#900c3f', '#9365b8'],
                ['#ffffff', '#9a9999', '#6c6969', '#4b4b4b', '#000000']
            ];

    let table = document.getElementsByClassName('wysiwyg-colors-table')[0];
    if (table === null)
        return;
    for (let i = 0; i < 4; i++) {
        let tableRow = document.createElement('tr');
        for (let j = 0; j < 5; j++) {
            let tableCell = document.createElement('td');
            tableCell.style = "background-color:" + colors[i][j] + "; padding:8px";
            tableCell.value = colors[i][j];
            tableCell.addEventListener('click', function () {
                changeColor(tableCell);
            });
            tableCell.classList.add('wysiwyg-color-brick');
            tableRow.append(tableCell);
        }
        table.append(tableRow);
    }
}

function toggleColorsSlot(ref) { //switch between 'url' and 'file upload' slots in 'insertImageDD' div
    if (ref.getAttribute('id') === 'switch3') {
        ref.classList.add('wysiwyg-item-small-active');
        document.getElementById('switch4').classList.remove('wysiwyg-item-small-active');
    }
    if (ref.getAttribute('id') === 'switch4') {
        ref.classList.add('wysiwyg-item-small-active');
        document.getElementById('switch3').classList.remove('wysiwyg-item-small-active');
    }
}

function changeColor(ref) {
    if (document.getElementById('switch3').classList.contains('wysiwyg-item-small-active')) {
        execute('foreColor', ref.value)
        document.getElementById('colorsDD').classList.remove('wysiwyg-dropdown-active');
    } else {
        execute('hiliteColor', ref.value)
        document.getElementById('colorsDD').classList.remove('wysiwyg-dropdown-active');
    }
}

function pickColor() { //doesnt work
    changeColor(document.getElementById('colorHex'));
}

//Headings
function initHeadingsDD() { //add eventListeners to headingsDD
    let headings = document.getElementById('headings').children;
    for (let heading of headings)
        heading.addEventListener('click', function () {
            addHeading(heading.innerHTML)
        });
}

function addHeading(heading) {
    execute('heading', heading);
    document.getElementById('headingsDD').classList.remove('dropdown-active');
}

//Commands
function execute(commandName, arg = null) { //execute command
    document.getElementById('wysiwygInputArea').focus();
    document.execCommand(commandName, false, arg);
}

function checkActiveCommands() { //check wchich command is active and apply 'active' class
    let bold = document.getElementById('bold');
    let italic = document.getElementById('italic');
    let underline = document.getElementById('underline');
    let strikeThrough = document.getElementById('strikeThrough');

    document.queryCommandState('bold') ? bold.classList.add('wysiwyg-item-active') : bold.classList.remove('wysiwyg-item-active');
    document.queryCommandState('italic') ? italic.classList.add('wysiwyg-item-active') : italic.classList.remove('wysiwyg-item-active');
    document.queryCommandState('underline') ? underline.classList.add('wysiwyg-item-active') : underline.classList.remove('wysiwyg-item-active');
    document.queryCommandState('strikeThrough') ? strikeThrough.classList.add('wysiwyg-item-active') : strikeThrough.classList.remove('wysiwyg-item-active');

    let currentFontSize = document.queryCommandValue("FontSize");
    for (let i of document.getElementsByClassName('wysiwyg-font-size')) {
        if (i.innerHTML == currentFontSize)
            i.classList.add('wysiwyg-font-size-active');
        else
            i.classList.remove('wysiwyg-font-size-active');
    }

    document.getElementById('colorIcon').style = "color:" + document.queryCommandValue('foreColor');
}

function initBaseCommands() { //add eventListeners to commands buttons
    document.getElementById('bold').addEventListener('click', function () {
        execute('bold');
    });

    document.getElementById('italic').addEventListener('click', function () {
        execute('italic');
    });

    document.getElementById('strikeThrough').addEventListener('click', function () {
        execute('strikeThrough');
    });

    document.getElementById('underline').addEventListener('click', function () {
        execute('underline');
    });

    document.getElementById('orderedList').addEventListener('click', function () {
        execute('insertOrderedList');
    });

    document.getElementById('unorderedList').addEventListener('click', function () {
        execute('insertUnorderedList');
    });

    document.getElementById('outdent').addEventListener('click', function () {
        execute('outdent');
    });

    document.getElementById('indent').addEventListener('click', function () {
        execute('indent');
    });

    document.getElementById('unlink').addEventListener('click', function () {
        execute('unlink');
    });

    document.getElementById('justifyCenter').addEventListener('click', function () {
        execute('justifyCenter');
        document.getElementById('justifyDD').classList.remove('wysiwyg-dropdown-active');

    });

    document.getElementById('justifyLeft').addEventListener('click', function () {
        execute('justifyLeft');
        document.getElementById('justifyDD').classList.remove('wysiwyg-dropdown-active');

    });

    document.getElementById('justifyRight').addEventListener('click', function () {
        execute('justifyRight');
        document.getElementById('justifyDD').classList.remove('wysiwyg-dropdown-active');

    });

    document.getElementById('justifyFull').addEventListener('click', function () {
        execute('justifyFull');
        document.getElementById('justifyDD').classList.remove('wysiwyg-dropdown-active');

    });

    document.getElementById('removeFormatBtn').addEventListener('click', function () {
        execute('removeFormat');
    });
}

//Helper functions and others
function toggleDropdowns(eventTarget) { //determine which dropDown menu should be closed/opened
    let clickedId = ''; //store id of clicked element


    if (elementWithIdWasClicked('fontSizesDD', eventTarget)) {
        if (!elementWithClassWasClicked('wysiwyg-dropdown-content', eventTarget)) //if dropdown-content was clicked, dont close DD
            document.getElementById('fontSizesDD').classList.toggle('wysiwyg-dropdown-active');
        clickedId = 'fontSizesDD';
    }

    if (elementWithIdWasClicked('justifyDD', eventTarget)) {
        if (!elementWithClassWasClicked('wysiwyg-dropdown-content', eventTarget))
            document.getElementById('justifyDD').classList.toggle('wysiwyg-dropdown-active');
        clickedId = 'justifyDD';
    }

    if (elementWithIdWasClicked('insertLinkDD', eventTarget)) {
        if (!elementWithClassWasClicked('wysiwyg-dropdown-content', eventTarget)) {
            document.getElementById('insertLinkDD').classList.toggle('wysiwyg-dropdown-active');
        }
        clickedId = 'insertLinkDD';
    }
    if (elementWithIdWasClicked('insertImageDD', eventTarget)) {
        if (!elementWithClassWasClicked('wysiwyg-dropdown-content', eventTarget))
            document.getElementById('insertImageDD').classList.toggle('wysiwyg-dropdown-active');
        clickedId = 'insertImageDD';
    }

    if (elementWithIdWasClicked('headingsDD', eventTarget)) {
        if (!elementWithClassWasClicked('wysiwyg-dropdown-content', eventTarget))
            document.getElementById('headingsDD').classList.toggle('wysiwyg-dropdown-active');
        clickedId = 'headingsDD';
    }

    if (elementWithIdWasClicked('colorsDD', eventTarget)) {
        if (!elementWithClassWasClicked('wysiwyg-dropdown-content', eventTarget))
            document.getElementById('colorsDD').classList.toggle('wysiwyg-dropdown-active');
        clickedId = 'colorsDD';
    }

    if (elementWithIdWasClicked('insertTableDD', eventTarget)) {
        if (!elementWithClassWasClicked('wysiwyg-dropdown-content', eventTarget))
            document.getElementById('insertTableDD').classList.toggle('wysiwyg-dropdown-active');
        clickedId = 'insertTableDD';
    }

    //remove empty links and images
    //if 'insertLinkDD' wasnt clicked
    if (clickedId !== 'insertLinkDD')
        removeEmptyLinks();
    //if 'insertImageDD' wasnt clicked
    if (clickedId !== 'insertImageDD') {
        removeEmptyImages();
        toggleImgUploadSlot(switch1); //set 'insert image via file upload' active after hiding dropdown
    }



    //hide all dropdowns expect this one with 'clickedId'
    for (let dd of document.getElementsByClassName('wysiwyg-dropdown'))
        if (clickedId == '' || dd !== document.getElementById(clickedId))
            dd.classList.remove('wysiwyg-dropdown-active');

}

function elementWithIdWasClicked(elementId, eventTarget) { //check if element with given ID was clicked
    if (eventTarget.closest('#' + elementId) === document.getElementById(elementId))
        return true;
    else
        return false;
}

function elementWithClassWasClicked(elementClass, eventTarget) { //check if element with given class was clicked
    if (eventTarget.closest('.' + elementClass) !== null)
        return true;
    else
        return false;
}

function addClickListenerToDoc() {
    document.addEventListener('click', function (event) { //add eventListeners to document
        if (wrapper === null)
            return;
        toggleDropdowns(event.target); //on every click determine which dropDowns should be opened/closed
        checkActiveCommands(); //on every click chceck which command is active
    });
}

function addKeydownListenerTowysiwygInputArea() {
    document.getElementById('wysiwygInputArea').addEventListener('keydown', function (e) { //add some keyDown listeners

        if (wrapper === null)
            return;
        checkActiveCommands(); //on every keyDown chceck which command is active
        //add some spaces after pressing tab in text editor
        if (e.keyCode === 9) { // tab key
            e.preventDefault(); // this will prevent us from tabbing out of the editor

            // now insert four non-breaking spaces for the tab key
            var editor = document.getElementById("wysiwygInputArea");
            var doc = editor.ownerDocument.defaultView;
            var sel = doc.getSelection();
            var range = sel.getRangeAt(0);

            var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0\u00a0");
            range.insertNode(tabNode);

            range.setStartAfter(tabNode);
            range.setEndAfter(tabNode);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    });
}

function setTooltipPosition() {
    let tooltips = document.getElementsByClassName('wysiwyg-tooltip');
    for (let tp of tooltips) {
        tp.addEventListener('mouseenter', function () {
            let tooltipText = getChildElementByClassName(tp, 'wysiwyg-tooltiptext');
            let boundingBox = tooltipText.getBoundingClientRect();

            if (boundingBox.top < 70) {
                tooltipText.style.bottom = null;
                tooltipText.style.top = "100%";
            } else if (boundingBox.top > 7) {
                tooltipText.style.top = null;
                tooltipText.style.bottom = "100%";
            }

            if (boundingBox.left < 70) {
                tooltipText.style.right = null;
                tooltipText.style.left = "0";
            } else if (boundingBox.left > 70) {
                tooltipText.style.left = null;
                tooltipText.style.right = "0";
            }
        });
    }
}

function setDropdownPosition() {
    let dropdowns = document.getElementsByClassName('wysiwyg-dropdown');

    for (let dd of dropdowns) {
        dd.addEventListener('mouseenter', function () {
            let ddContent = getChildElementByClassName(dd, 'wysiwyg-dropdown-content')
            let boundingBox = dd.getBoundingClientRect();
            if (boundingBox.left < 220) {
                ddContent.style.right = null;
                ddContent.style.left = "0";
            } else if (boundingBox.left > 220) {
                ddContent.style.left = null;
                ddContent.style.right = "0";
            }
        });
    }
}

function getChildElementByClassName(element, className) {
    for (var i = 0; i < element.childNodes.length; i++) {
        if (element.childNodes[i].classList !== undefined && element.childNodes[i].classList.contains(className))
            return element.childNodes[i];
    }
}
