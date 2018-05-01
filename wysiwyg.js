    (function loadWYSIWYG() {
        let template = `  <div class="editor">
            <div class="bar unselectable">
                <button onclick="execute('bold')" class="item" id="bold"><i class="fa fa-bold"></i></button>
                <button onclick="execute('italic')" class="item" id="italic"><i class="fa fa-italic"></i></button>
                <button onclick="execute('underline')" class="item" id="underline"><i class="fa fa-underline"></i></button>
                <button onclick="execute('strikeThrough')" class="item" id="strikeThrough"><i class="fas fa-strikethrough"></i></button>

                <div class="dropdown item" id="headingsDD">
                    <i class="fas fa-heading"></i>
                    <div class="dropdown-content">
                        <h1 class="item-small" style="margin: 0" onclick="addHeading('H1')">H1</h1>
                        <h2 class="item-small" style="margin: 0" onclick="addHeading('H2')">H2</h2>
                        <h3 class="item-small" style="margin: 0" onclick="addHeading('H3')">H3</h3>
                        <h4 class="item-small" style="margin: 0" onclick="addHeading('H4')">H4</h4>
                        <h5 class="item-small" style="margin: 0" onclick="addHeading('H5')">H5</h5>
                        <h6 class="item-small" style="margin: 0" onclick="addHeading('H6')">H6</h6>
                    </div>
                </div>

                <div class="dropdown item" id="colorsDD">
                    <i class="fas fa-tint" id="colorIcon"></i>
                    <div class="dropdown-content DD-content3">
                        <div style="float:left; margin-bottom:5px; width:100%">
                            <div class="item-small item-small-active" id="switch3" onclick="toggleColorsSlot(this)" style="float:left"><span style="font-size: 11px">Text</span></div>
                            <div class="item-small " id="switch4" onclick="toggleColorsSlot(this)" style="float:left"><span style="font-size: 11px">Background</span></div>
                        </div>
                        <table class="colors-table">
                        </table>
                        <input placeholder="#Hex" id="colorHex" />
                        <button onclick="pickColor();" class="btn">Pick</button>
                    </div>
                </div>

                <div class="dropdown item" id="fontSizesDD">
                    <i class="fas fa-font"></i> <i class="fas fa-arrows-alt-v"></i>
                    <div class="dropdown-content" id="fontSizes">
                    </div>
                </div>

                <button onclick="execute('insertOrderedList')" class="item"><i class="fas fa-list-ol"></i></button>
                <button onclick="execute('insertUnorderedList')" class="item"><i class="fas fa-list-ul"></i></button>
                <button onclick="execute('indent')" class="item"><i class="fas fa-indent"></i></button>
                <button onclick="execute('outdent')" class="item"><i class="fas fa-outdent"></i></button>


                <div class="dropdown item" id="insertTableDD">
                    <i class="fas fa-table"></i>
                    <div class="dropdown-content">
                        <table id="tableContainer" onmouseleave="setWhiteBackgroundInTable()">
                        </table>
                    </div>
                </div>


                <div class="dropdown item" id="justifyDD">
                    <i class="fas fa-align-center"></i> <i class="fas fa-caret-down"></i>
                    <div class="dropdown-content">
                        <button onclick="execute('justifyCenter'); " class="item-small"><i class="fas fa-sm fa-align-center"></i></button>
                        <button onclick="execute('justifyLeft'); " class="item-small"><i class="fas fa-sm fa-align-left"></i></button>
                        <button onclick="execute('justifyRight'); " class="item-small"><i class="fas fa-sm fa-align-right"></i></button>
                        <button onclick="execute('justifyFull'); " class="item-small"><i class="fas fa-sm fa-align-justify"></i></button>
                    </div>
                </div>

                <div class="dropdown item" id="insertLinkDD">
                    <i class="fa fa-link"></i>
                    <div class="dropdown-content DD-content2">
                        <input placeholder="Url" id="linkUrl" />
                        <input placeholder="Text" id="linkText" />
                        <button onclick="insertLink();" class="btn">Insert</button>
                    </div>
                </div>

                <div class="dropdown item" id="insertImageDD">
                    <i class="far fa-image"></i>
                    <div class="dropdown-content DD-content2">

                        <div style="float:left; margin-bottom:5px; width:100%">
                            <div class="item-small" id="switch1" onclick="toggleImgUploadSlot(this)" style="float:left"><i class="fas fa-xs fa-upload"></i></div>
                            <div class="item-small item-small-active" id="switch2" onclick="toggleImgUploadSlot(this)" style="float:left"><i class="fas fa-xs fa-link"></i></div>
                        </div>

                        <div id="imgUrl">
                            <input placeholder="Url" name="imgUrl" />
                            <button onclick="insertImage()" class="btn" id="insertImage">Insert</button>
                        </div>

                        <div class="invisible-imageUpload" id="imgUpload">
                            <input type="file" name="imgUploadFile" onchange="showImage(event)" hidden/>
                            <button class="img-upload" style="float:left" onclick="clickUploader()">Currently unavailable...</button>
                        </div>

                    </div>
                </div>



                <button onclick="execute('removeFormat'); " class="item "><i class="fas fa-eraser"></i></button>
            </div>

            <div class="editable" id="inputArea" contenteditable="true" onmouseleave="getCarretPosition()">

            </div>
        </div>`;
        if (document.getElementById('editor-div') !== null) {
            addCSS('wysiwyg.css');
            addScript('https://use.fontawesome.com/releases/v5.0.7/js/all.js');
            document.getElementById('editor-div').innerHTML = template;
        } else {
            console.log('Didnt find element with "editor-div" ID');
        }
    })();
    var positionElement; //position of the carret

    function addScript(src) {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;

        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function addCSS(css) {
        let link = document.createElement("link");
        link.href = css;
        link.type = "text/css";
        link.rel = "stylesheet";
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    //Image upload section
    function getImgBySrc(src) { //return im with given src
        let imgs = document.getElementsByTagName('img');
        for (let i of imgs)
            if (i.getAttribute('src') === src)
                return i;
    }

    function clickUploader() { //click hidden file input
        //document.getElementsByName('imgUploadFile')[0].click();
    }

    function showImage(event) { //show image that was uploaded by file input
        let src = URL.createObjectURL(event.target.files[0]);
        execute('insertImage', src);
        let img = getImgBySrc(src) //get image that was inserted by execCommand
        if (img !== undefined)
            img.style = "width:200px;";

        document.getElementById('insertImageDD').classList.remove('dropdown-active');
    }

    function insertImage() { //insert image from given url from input field
        execute('insertImage', document.getElementsByName('imgUrl')[0].value);
        let img = getImgBySrc(document.getElementsByName('imgUrl')[0].value) //get image that was inserted by execCommand
        if (img !== undefined)
            img.style = "width:200px;";

        document.getElementById('insertImageDD').classList.remove('dropdown-active');
    }

    function toggleImgUploadSlot(ref) { //switch between 'url' and 'file upload' slots in 'insertImageDD' div
        if (ref.getAttribute('id') === 'switch1') {
            document.getElementById('imgUrl').classList.add('invisible-imageUpload');
            document.getElementById('imgUpload').classList.remove('invisible-imageUpload')
            ref.classList.add('item-small-active');
            document.getElementById('switch2').classList.remove('item-small-active');
        }
        if (ref.getAttribute('id') === 'switch2') {
            document.getElementById('imgUpload').classList.add('invisible-imageUpload');
            document.getElementById('imgUrl').classList.remove('invisible-imageUpload')
            ref.classList.add('item-small-active');
            document.getElementById('switch1').classList.remove('item-small-active');
        }
    }


    //Fonts Section
    (function createFontSizes() { //fill drop down selection with 7 values
        let tmp = document.getElementById('fontSizes');
        if (tmp === null)
            return;
        for (let i = 1; i < 8; i++) {
            let div = document.createElement('div');
            div.classList.add('font-size');
            div.innerHTML = i;
            div.setAttribute('onclick', 'changeFontSize(' + i + ');');
            tmp.appendChild(div);
        }
    })();

    function changeFontSize(size) {
        for (let i of document.getElementsByClassName('font-size')) {
            if (i.innerHTML == size)
                i.classList.add('font-size-active');
            else
                i.classList.remove('font-size-active');
        }

        document.getElementById('fontSizesDD').classList.remove('dropdown-active');
        execute('fontSize', size);

    }

    //Table inserting Section
    (function createTable() {
        let tab = document.getElementById('tableContainer');
        if (tab === null)
            return;
        for (let i = 0; i < 5; i++) {
            let tr = document.createElement('tr');
            tr.setAttribute('id', 'tr' + i);
            for (let j = 0; j < 5; j++) {
                let td = document.createElement('td');
                td.classList.add('td-custom');
                td.setAttribute('id', 'td' + i + '' + j);
                td.setAttribute('onmouseover', 'highlightTable(' + i + ',' + j + ')');
                td.setAttribute('onclick', 'insertTable(' + i + ',' + j + ')');
                tr.append(td);
            }
            tab.append(tr);
        }

    })();

    function setWhiteBackgroundInTable() {
        let tab = document.getElementById('tableContainer');
        for (let tr of tab.childNodes) {
            for (let td of tr.childNodes) {
                if (td.nodeName === 'TD')
                    td.classList.remove('td-custom-onhover');
            }
        }
    }

    function highlightTable(row, col) {
        setWhiteBackgroundInTable();

        for (let i = 0; i <= row; i++) {
            for (let j = 0; j <= col; j++) {
                let td = document.getElementById('td' + i + '' + j);
                td.classList.add('td-custom-onhover');
            }
        }
    }

    function insertTable(row, col) {
        let html = "<table>"
        for (let i = 0; i <= row; i++) {
            html += "<tr>"
            for (let j = 0; j <= col; j++) {
                html += "<td></td>";
            }
            html += "</tr>";
        }
        html += "</table>";
        execute('insertHTML', html);
        execute('insertHTML', '<br/>');
    }

    //Colors
    (function createColorsTable() {
        let colors = [
                ['#c70039', '#ff5733', '#ff8d1a', '#ffc300', '#2B1CFF'],
                ['#eddd53', '#add45c', '#57c785', '#00baad', '#10FF55'],
                ['#2a7b9b', '#3d3d6b', '#511849', '#900c3f', '#9365b8'],
                ['#ffffff', '#9a9999', '#6c6969', '#4b4b4b', '#000000']
            ];

        let table = document.getElementsByClassName('colors-table')[0];
        if (table === null)
            return;
        for (let i = 0; i < 4; i++) {
            let tableRow = document.createElement('tr');
            for (let j = 0; j < 5; j++) {
                let tableCell = document.createElement('td');
                tableCell.style = "background-color:" + colors[i][j] + "; padding:8px";
                tableCell.value = colors[i][j];
                tableCell.setAttribute('onclick', 'changeColor(this)')
                tableCell.classList.add('color-brick');
                tableRow.append(tableCell);
            }
            table.append(tableRow);
        }
    })();

    function toggleColorsSlot(ref) { //switch between 'url' and 'file upload' slots in 'insertImageDD' div
        if (ref.getAttribute('id') === 'switch3') {
            ref.classList.add('item-small-active');
            document.getElementById('switch4').classList.remove('item-small-active');
        }
        if (ref.getAttribute('id') === 'switch4') {
            ref.classList.add('item-small-active');
            document.getElementById('switch3').classList.remove('item-small-active');
        }
    }

    function changeColor(ref) {
        if (document.getElementById('switch3').classList.contains('item-small-active')) {
            execute('foreColor', ref.value)
            document.getElementById('colorsDD').classList.remove('dropdown-active');
        } else {
            execute('hiliteColor', ref.value)
            document.getElementById('colorsDD').classList.remove('dropdown-active');
        }
    }

    function pickColor() {
        changeColor(document.getElementById('colorHex'));
    }

    //Commands
    function execute(commandName, arg = null) { //execute command
        document.execCommand(commandName, false, arg);
        putCarret('inputArea', positionElement);
    }

    function insertLink() { // insert link from given url from input field
        let url = document.getElementById('linkUrl').value
        let urlText = document.getElementById('linkText').value
        if (url !== '') {
            urlText === '' ? urlText = url : urlText = urlText;
            execute('insertHTML', '<a href=' + url + '>' + urlText + '</a>\u00a0');
            execute('removeFormat');
            putCarret('inputArea', positionElement);
            document.getElementById('insertLinkDD').classList.remove('dropdown-active');
        }
    }

    function checkActiveCommands() { //check wchich command is active and apply 'active' class
        let bold = document.getElementById('bold');
        let italic = document.getElementById('italic');
        let underline = document.getElementById('underline');
        let strikeThrough = document.getElementById('strikeThrough');

        document.queryCommandState('bold') ? bold.classList.add('item-active') : bold.classList.remove('item-active');
        document.queryCommandState('italic') ? italic.classList.add('item-active') : italic.classList.remove('item-active');
        document.queryCommandState('underline') ? underline.classList.add('item-active') : underline.classList.remove('item-active');
        document.queryCommandState('strikeThrough') ? strikeThrough.classList.add('item-active') : strikeThrough.classList.remove('item-active');

        let currentFontSize = document.queryCommandValue("FontSize");
        for (let i of document.getElementsByClassName('font-size')) {
            if (i.innerHTML == currentFontSize)
                i.classList.add('font-size-active');
            else
                i.classList.remove('font-size-active');
        }

        document.getElementById('colorIcon').style = "color:" + document.queryCommandValue('foreColor');
    }

    function addHeading(heading) {
        execute('heading', heading);
        document.getElementById('headingsDD').classList.remove('dropdown-active');
    }

    //Helper functions and others
    function toggleDropdowns(eventTarget) { //determine wchich dropDown menu should be closed/opened
        let clickedId = ''; //store id of clicked element

        if (elementWithIdWasClicked('fontSizesDD', eventTarget)) {
            if (!elementWithClassWasClicked('dropdown-content', eventTarget)) //if dropdown-content was clicked, dont close DD
                document.getElementById('fontSizesDD').classList.toggle('dropdown-active');
            clickedId = 'fontSizesDD';
        }

        if (elementWithIdWasClicked('justifyDD', eventTarget)) {
            if (!elementWithClassWasClicked('dropdown-content', eventTarget))
                document.getElementById('justifyDD').classList.toggle('dropdown-active');
            clickedId = 'justifyDD';
        }

        if (elementWithIdWasClicked('insertLinkDD', eventTarget)) {
            if (!elementWithClassWasClicked('dropdown-content', eventTarget))
                document.getElementById('insertLinkDD').classList.toggle('dropdown-active');
            clickedId = 'insertLinkDD';
        }
        if (elementWithIdWasClicked('insertImageDD', eventTarget)) {
            if (!elementWithClassWasClicked('dropdown-content', eventTarget))
                document.getElementById('insertImageDD').classList.toggle('dropdown-active');
            clickedId = 'insertImageDD';
        }

        if (elementWithIdWasClicked('headingsDD', eventTarget)) {
            if (!elementWithClassWasClicked('dropdown-content', eventTarget))
                document.getElementById('headingsDD').classList.toggle('dropdown-active');
            clickedId = 'headingsDD';
        }

        if (elementWithIdWasClicked('colorsDD', eventTarget)) {
            if (!elementWithClassWasClicked('dropdown-content', eventTarget))
                document.getElementById('colorsDD').classList.toggle('dropdown-active');
            clickedId = 'colorsDD';
        }

        if (elementWithIdWasClicked('insertTableDD', eventTarget)) {
            if (!elementWithClassWasClicked('dropdown-content', eventTarget))
                document.getElementById('insertTableDD').classList.toggle('dropdown-active');
            clickedId = 'insertTableDD';
        }


        //hide all dropdowns expect this one with 'clickedId'
        for (let dd of document.getElementsByClassName('dropdown'))
            if (clickedId == '' || dd !== document.getElementById(clickedId))
                dd.classList.remove('dropdown-active');

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

    document.addEventListener('click', function (event) { //add eventListeners to document
        if (document.getElementById('editor-div') === null)
            return;
        toggleDropdowns(event.target); //on every click determine wchcich dropDowns should be opened/closed
        checkActiveCommands(); //on every click chceck wchich command is active
    });

    document.getElementById('inputArea').addEventListener('keydown', function (e) { //add some keyDown listeners
        if (document.getElementById('editor-div') === null)
            return;
        checkActiveCommands(); //on every keyDown chceck wchich command is active
        //add some spaces after pressing tab in text editor
        if (e.keyCode === 9) { // tab key
            e.preventDefault(); // this will prevent us from tabbing out of the editor

            // now insert four non-breaking spaces for the tab key
            var editor = document.getElementById("inputArea");
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

    function putCarret(elemId, caretPos) { //put carret in textarea after using text editor's options
        var elem = document.getElementById(elemId);
        if (elem != null) {
            if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.move('character', caretPos);
                range.select();
            } else {
                if (elem.selectionStart) {
                    elem.focus();
                    elem.setSelectionRange(caretPos, caretPos);
                } else
                    elem.focus();
            }
        }
    }

    function getCarretPosition() {
        positionElement = document.getElementById('inputArea').selectionStart;
    }
