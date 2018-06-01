'use strict';

var wysiwygEditor = (function () {
    var wrapper; //cache DOM
    var wysiwygInputArea; //cache DOM
    var countOfLoadedModules = 0; //increment after each module load, and control further actions
    var modules = [ //all available modules
        'bold',
        'underline',
        'italic',
        'strikeThrough',
        'fonts',
        'colors',
        'headings',
        'orderedList',
        'unorderedList',
        'indent',
        'outdent',
        'justify',
        'links',
        'unlink',
        'tables',
        'images',
        'removeFormat'
    ];


    //add event listeners
    function addClickListenerToDoc() {
        document.addEventListener('click', function (event) { //add eventListeners to document
            if (wrapper === null)
                return;
            hideDropdowns(event.target);
            deleteEmptyLinksAndImages(event.target);
            chceckWchcichCommandIsActive(); //on every click chceck which command is active
        });
    }

    function addKeydownListenerTowysiwygInputArea() {
        wysiwygInputArea.addEventListener('keydown', function (e) {

            if (wrapper === null)
                return;
            chceckWchcichCommandIsActive(); //on every keyDown chceck which command is active

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

    //functions
    function load(containerID, requiredModules = null) {
        if (document.getElementById(containerID) === null) {
            console.log('Didnt find element with given ID: ' + id);
            return;
        }

        wrapper = document.getElementById(containerID);
        wrapper.innerHTML = `<div class="wysiwyg-editor">
                                <div class="wysiwyg-bar wysiwyg-unselectable"></div>
                                <div id="wysiwygInputArea" contenteditable="true"></div>
                            </div>`;

        //cache DOM
        wysiwygInputArea = document.getElementById('wysiwygInputArea');

        //prepare ediotr
        wysiwygInputArea.innerHTML = '';
        wysiwygInputArea.focus();

        //load modules
        if (requiredModules !== null) { //if user expects selected modules
            for (let x of requiredModules)
                addScript('modules/' + x + '.js', controlScriptsLoadingProcess);
            modules = requiredModules; //update global variable
        } else {
            for (let x of modules)
                addScript('modules/' + x + '.js', controlScriptsLoadingProcess);
        }

        addScript('https://use.fontawesome.com/releases/v5.0.7/js/all.js');
    }

    function controlScriptsLoadingProcess() {
        //increment global variable after each module load. If all modules are load execute other scripts
        countOfLoadedModules++;

        if (countOfLoadedModules == modules.length) {
            addClickListenerToDoc();
            setTooltipPosition();
            setDropdownPosition();
            addKeydownListenerTowysiwygInputArea();
        }
    }

    function addScript(src, callback = null) {
        let script = document.createElement("script")
        script.type = "text/javascript";
        script.src = src;
        document.getElementsByTagName("head")[0].appendChild(script);
        script.onload = callback;
    }

    function chceckWchcichCommandIsActive() { //check wchich command is active and apply 'active' class
        checkCommand('bold');
        checkCommand('italic');
        checkCommand('underline');
        checkCommand('strikeThrough');


        if (modules.includes('fonts')) {
            let currentFontSize = document.queryCommandValue("FontSize");
            for (let i of document.getElementsByClassName('wysiwyg-font-size')) {
                if (i.innerHTML == currentFontSize)
                    i.classList.add('wysiwyg-font-size-active');
                else
                    i.classList.remove('wysiwyg-font-size-active');
            }
        }

        if (modules.includes('colors'))
            document.getElementById('colorIcon').style = "color:" + document.queryCommandValue('foreColor');
    }

    function checkCommand(commandName) { //check selected command
        if (modules.includes(commandName)) {
            let element = document.getElementById(commandName);
            document.queryCommandState(commandName) ? element.classList.add('wysiwyg-item-active') : element.classList.remove('wysiwyg-item-active');
        }
    }

    function hideDropdowns(eventTarget) {
        //hide all dropdowns
        for (let dd of document.getElementsByClassName('wysiwyg-dropdown'))
            dd.classList.remove('wysiwyg-dropdown-active');
    }

    function deleteEmptyLinksAndImages(eventTarget) {
        //if 'insertLinkDD' wasnt clicked
        if (!elementWithIdWasClicked('insertLinkDD', eventTarget))
            InsertLinkModule.removeEmptyLinks();
        //if 'insertImageDD' wasnt clicked
        if (!elementWithIdWasClicked('insertImageDD', eventTarget)) {
            InsertImageModule.removeEmptyImages();
            InsertImageModule.toggleImgUploadSlot(switch1); //set 'insert image via file upload' active after hiding dropdown
        }
    }

    function elementWithIdWasClicked(elementId, eventTarget) { //check if element with given ID was clicked
        if (eventTarget.closest('#' + elementId) === document.getElementById(elementId))
            return true;
        else
            return false;
    }


    function setTooltipPosition() { //set proper position of each tooltip
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

    function setDropdownPosition() { //set proper position of each dropdown
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

    return {
        load: load
    }
})();
